import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { HTTP_STATUS } from "./utils/constants";
import { failure } from "./utils/commonResponse";
import APIException from "./utils/exceptions";
import { rootPath } from "./utils/constants";
import connectToDB from "./config/db";
import authMiddleware from "./middlewares/auth.middleware";

// dotenv must be configured before declaring/importing any value dependent on env
dotenv.config();
connectToDB();
const corsOrigin = process.env.FRONTEND_URL ?? true;
const appPort = process.env.PORT ?? 8000;

const app = express();
app.use(express.urlencoded({ extended: true })); // parses data when Content-Type header is application/x-www-form-urlencoded
app.use(express.json()); // parses data when Content-Type header is application/json
app.use(cookieParser());
app.use("/static", express.static(path.join(rootPath, "..", "assets")));
app.use("/media", express.static(path.join(rootPath, "..", "media")));
app.use(morgan("dev"));

app.use(
    cors({
        origin: corsOrigin, //true for all, array, regex, or string for specific
        credentials: true,
    })
);

app.listen(appPort, (err?: Error) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Server is running on port ${appPort}`);
});

app.use(authMiddleware);

app.use((_req, res, _next) => {
    res.status(HTTP_STATUS.NOT_FOUND).send(failure("Route not found"));
});

app.use(<E extends Error>(err: E, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    if (err instanceof APIException) {
        res.status(err.status).send(failure(err.message, err.errors));
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(failure("Internal Server Error"));
});
