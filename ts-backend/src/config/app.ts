import path from "path";

export const appPort = process.env.PORT || 8000;
export const corsOrigin = process.env.FRONTEND_URL || true;
export const rootPath = path.join(__dirname, "..");

export const JWT_keys = {
    access: process.env.JWT_ACCESS_SECRET_KEY || "",
    refresh: process.env.JWT_REFRESH_SECRET_KEY || "",
};
