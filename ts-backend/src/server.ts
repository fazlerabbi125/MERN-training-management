import express, { Response } from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import HTTP_STATUS from "./utils/httpStatus";
import { failure } from "./utils/commonResponse";
import APIException from "./utils/exceptions";
// Config values imported after dotenv configuration to get env variables
import { appPort, corsOrigin, connectToDB, rootPath } from "./config";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(path.join(rootPath, "..", "assets")));
app.use(morgan("dev"));

app.use(
    cors({
        origin: corsOrigin, //true for all, array, regex, or string for specific
        credentials: true,
    })
);

app.listen(appPort, async (err?: Error) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Server is running on port ${appPort}`);
    await connectToDB(process.env.DB_URI ?? "", process.env.DB_NAME ?? "");
});

app.use((_req, res, _next) => {
    res.status(HTTP_STATUS.NOT_FOUND).send(failure("Route not found"));
});

app.use(<E extends Error>(err: E, _req, res: Response, _next) => {
    console.error(err);
    if (err instanceof APIException) {
        res.status(err.status).send(failure(err.message, err.errors));
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(failure("Internal Server Error"));
});
