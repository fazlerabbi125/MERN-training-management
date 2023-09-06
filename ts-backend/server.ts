import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import path from "path";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { failure } from "./utils/commonResponse";
import HTTP_STATUS from "./utils/httpStatus";

const app: Express = express();
const server = http.createServer(app);
dotenv.config();

const port = process.env.PORT || 8000;
const DB_URI = process.env.DB_URI || "";

app.use(express.urlencoded({ extended: true })); // Parses urlencoded bodies
app.use(express.json()); // Parses JSON data
app.use(
    cors({
        origin: process.env.FRONTEND_URL || true, //true for all, array, regex, or string for specific
        credentials: true,
    })
); //cors
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
    morgan(
        "dev"
        // {// log only 4xx and 5xx responses to console
        //     skip: function (req, res) { return res.statusCode < 400 }
        // }
    )
);

mongoose
    .connect(DB_URI, { dbName: "training-management" })
    .then(() => {
        console.log("MongoDB database is connected!!");
        server.listen(port, () => {
            console.log(`Server is running at port-${port}`);
        });
    })
    .catch((err: Error) => console.log(err.message));

//app.use('/api', [routers])

app.use((req: Request, res: Response) => {
    res.status(HTTP_STATUS.NOT_FOUND).send(failure("Route not found"));
});

app.use((err: Record<string, any>, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(failure("Internal Server Error!", err));
});
