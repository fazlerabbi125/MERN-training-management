import { Response, Request, NextFunction } from "express";
import { JWT_keys } from "@/config/jwt";
import { verifyJwtToken } from "@/utils/jwt_helper";
import User from "@/models/user.model";

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const auth_header = req.headers.authorization;
    try {
        if (!auth_header?.startsWith("Bearer"))
            throw new Error("Authorization header is missing/invalid");
        const token = auth_header.split(" ").at(-1); //authorization="Bearer "+token
        if (!token) throw new Error("Token is missing");
        const { user_id } = verifyJwtToken(token, JWT_keys.access);
        if (!user_id) throw new Error("User identification is missing in token");
        const user = await User.findById(user_id);
        if (!user) throw new Error("User not found");
        req.user = user; //Decoded data is passed this way instead of using spread operator becauses expiration time (exp) and iat in token will cause error when vertified
    } catch (err) {
        // req.user is always undefined initially
    } finally {
        next();
    }
}
