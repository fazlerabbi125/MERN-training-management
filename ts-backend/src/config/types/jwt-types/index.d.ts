import jwt from "jsonwebtoken";
import convertToJwtPayload from "@/utils/jwt_helper";
import { Types } from "mongoose";

declare module "jsonwebtoken" {
    export interface JwtPayload {
        user_id?: Types.ObjectId;
    }
}
