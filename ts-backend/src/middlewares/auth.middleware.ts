import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { JWT_keys } from "@/config/app";
import User from "@/models/user";

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.headers.authorization?.startsWith("Bearer"))
            throw new Error("Authorization header is invalid");
        const token = req.headers.authorization.split(" ").at(-1); //authorization="Bearer "+token
        if (!token) throw new Error("Token is missing");
        const { user_id } = <JwtPayload>jwt.verify(token, JWT_keys.access);
        if (!user_id) throw new Error("User identification is missing in token");
        const user = await User.findById(user_id);
        if (!user) throw new Error("User not found");
        req.user = user; //Decoded data is passed this way instead of using spread operator becauses expiration time (exp) and iat in token will cause error when vertified
    } catch (err) {
        req.user = undefined;
    } finally {
        next();
    }
}
