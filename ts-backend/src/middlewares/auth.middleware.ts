import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { userModel } from "@/models";
import { JWT_keys } from "@/utils/constants";

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization?.startsWith("Bearer")) return next();

    const token: string | undefined = req.headers.authorization.split(" ")[1]; //authorization="Bearer "+token
    try {
        if (!token) throw new Error("No token found");
        const decodedData = <JwtPayload>jwt.verify(token, JWT_keys.access);
        const user = await userModel.findUniqueOrThrow({
            where: {
                id: decodedData.user_id,
            },
        });
        req.user = user; //Decoded data is passed this way instead of using spread operator becauses expiration time (exp) and iat in token will cause error when vertified
        next();
    } catch (error: any) {
        req.user = undefined;
        next();
    }
}
