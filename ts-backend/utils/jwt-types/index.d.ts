import jwt from "jsonwebtoken";
import { Request } from "express";

declare module "jsonwebtoken" {
    export interface JwtPayload extends NonNullable<Request["user"]> {}
}
