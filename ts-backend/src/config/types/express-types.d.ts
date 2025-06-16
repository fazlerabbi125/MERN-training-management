import express from "express";
import { UserDocument } from "@/models/user.model";

declare module "express" {
    export interface Request {
        user?: UserDocument;
    }
}
