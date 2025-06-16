import jwt from "jsonwebtoken";
import { Types } from "mongoose";

declare module "jsonwebtoken" {
    export interface JwtPayload {
        user_id?: Types.ObjectId;
    }
}
