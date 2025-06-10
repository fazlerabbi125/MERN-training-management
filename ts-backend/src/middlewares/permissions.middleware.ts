import { Request, RequestHandler } from "express";
import { HTTP_STATUS } from "@/utils/constants";
import APIException from "@/utils/exceptions";

class PermissionMiddleware {
    error_messages = {
        [HTTP_STATUS.UNAUTHORIZED]: "Unauthorized request",
        [HTTP_STATUS.FORBIDDEN]: "You are forbidden from making this request",
    };
    // Arrow functions used here to bind the value of this to each method
    isAuthenticated: RequestHandler = (req: Request, res, next) => {
        if (req.user) return next();
        return next(
            new APIException(
                this.error_messages[HTTP_STATUS.UNAUTHORIZED],
                HTTP_STATUS.UNAUTHORIZED
            )
        );
    };
    isAdmin: RequestHandler = (req: Request, res, next) => {
        if (req.user?.isAdmin) return next();
        return next(
            new APIException(this.error_messages[HTTP_STATUS.FORBIDDEN], HTTP_STATUS.FORBIDDEN)
        );
    };
    isMember: RequestHandler = (req: Request, res, next) => {
        if (!req.user?.isAdmin) return next();
        return next(
            new APIException(this.error_messages[HTTP_STATUS.FORBIDDEN], HTTP_STATUS.FORBIDDEN)
        );
    };
    isGuest: RequestHandler = (req: Request, res, next) => {
        if (!req.get("authorization")) return next();
        return next(
            new APIException(this.error_messages[HTTP_STATUS.FORBIDDEN], HTTP_STATUS.FORBIDDEN)
        );
    };
}

export default new PermissionMiddleware();
