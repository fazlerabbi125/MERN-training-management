import mongoose from "mongoose";

export const appPort = process.env.PORT || 8000;
export const corsOrigin = process.env.FRONTEND_URL || true;
export const rootPath = __dirname;

export async function connectToDB(dbURI: string, dbName: string) {
    if (!dbURI) {
        throw new Error("DB URI must be defined");
    } else if (!dbName) {
        throw new Error("DB NAME must be defined");
    }
    try {
        await mongoose.connect(dbURI, { dbName });
        console.log("Connected to DB successfully");
    } catch (error) {
        console.error("Failed to connect to DB", error);
    }
}
