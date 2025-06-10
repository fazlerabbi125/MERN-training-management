import mongoose from "mongoose";

export default function connectToDB() {
    const dbURI = process.env.DB_URI ?? "";
    const dbName = process.env.DB_NAME;
    mongoose
        .connect(dbURI, { dbName })
        .then(() => {
            console.log("Connected to DB successfully");
        })
        .catch((error) => {
            console.error("Failed to connect to MongoDB", error);
        });
}
