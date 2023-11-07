import { NextFunction, Request, Response } from "express";
import { validationResult, ValidationChain } from "express-validator";
import HTTP_STATUS from "./httpStatus";
import { failure } from "./commonResponse";
// can be reused by many routes

//https://express-validator.github.io/docs/guides/manually-running/
// sequential processing, stops running validations chain if the previous one fails.
export default function runValidation(validations: ValidationChain[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (const validation of validations) {
            await validation.run(req);
        }

        const errors = validationResult(req).formatWith((err) => <string>err.msg);
        if (errors.isEmpty()) return next();
        return res
            .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
            .json(failure("The given data was invalid.", errors.mapped()));
    };
}
