import express, { Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import HTTP_STATUS from "./utils/httpStatus";
import { failure } from "./utils/commonResponse";
import APIException from "./utils/exceptions";

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(
    morgan(
        "dev"
        // {// log only 4xx and 5xx responses to console
        //     skip: function (req, res) { return res.statusCode < 400 }
        // }
    )
);
const port = process.env.PORT || 8000;
const corsOrigin = process.env.FRONTEND_URL || true;
app.use(
    cors({
        origin: corsOrigin, //true for all, array, regex, or string for specific
        credentials: true,
    })
);

app.listen(port, (err?: Error) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Server is running on port ${port}`);
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
