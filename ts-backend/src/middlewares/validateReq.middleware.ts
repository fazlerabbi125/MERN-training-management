import { NextFunction, Request, Response } from "express";
import { validationResult, ContextRunner } from "express-validator";
import { HTTP_STATUS } from "@/utils/constants";
import APIException from "../utils/exceptions";
import { deleteFile } from "../utils/file_handling";

//https://express-validator.github.io/docs/guides/manually-running/
// sequential processing of validations chains
export default function validateReq(validations: ContextRunner[]) {
    return async (req: Request, _res: Response, next: NextFunction) => {
        for (const validation of validations) {
            await validation.run(req);
        }

        const errors = validationResult(req).formatWith((err) => <string>err.msg);
        if (errors.isEmpty()) return next();
        //https://github.com/express-validator/express-validator/issues/783
        //https://stackoverflow.com/questions/63632356/multer-and-express-validator-creating-problem-in-validation
        /* Using multer middleware after validation middleware by express-validator doesn't execute validation
            and submits empty form as it cannot properly handle multipart/form-data. Multer middleware has to be used before
            express-validator middleware because multer internally parses the multipart/form-data which allows fields 
            to be accessed through req.body
            */
        if (req.file) await deleteFile(req.file.path);
        return next(
            new APIException(
                "The given data was invalid.",
                HTTP_STATUS.UNPROCESSABLE_ENTITY,
                errors.mapped()
            )
        );
    };
}
