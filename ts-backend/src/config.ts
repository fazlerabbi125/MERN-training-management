import mongoose from "mongoose";

export const appPort = process.env.PORT || 8000;
export const corsOrigin = process.env.FRONTEND_URL || true;
export const rootPath = __dirname;

export async function connectToDB() {
    const dbURI = process.env.DB_URI ?? "";
    const dbName = process.env.DB_NAME;
    try {
        await mongoose.connect(dbURI, { dbName });
        console.log("Connected to DB successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}
