import { SignOptions } from "jsonwebtoken";

export const JWT_keys = {
    access: process.env.JWT_ACCESS_SECRET_KEY ?? "",
    refresh: process.env.JWT_REFRESH_SECRET_KEY ?? "",
};

export const JWT_exp = {
    access: process.env.JWT_ACCESS_EXPIRATION,
    refresh: process.env.JWT_REFRESH_EXPIRATION,
} as Record<"access" | "refresh", SignOptions["expiresIn"]>;
