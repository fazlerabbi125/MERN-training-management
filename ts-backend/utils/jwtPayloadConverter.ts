import { Request } from "express";

export default function jwtPayloadConverter<T extends NonNullable<Request["user"]>>(data: T) {
    return {
        _id: data._id,
        isAdmin: data.isAdmin,
    };
}