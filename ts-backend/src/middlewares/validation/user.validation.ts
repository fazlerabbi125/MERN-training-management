import { userModel } from "@/models";
import { body, param } from "express-validator";

// Default error message by express-validator: Invalid value

export const userValidator = {
    createUser: [
        body("name").notEmpty().withMessage("Name is required").isString().trim(),
        body("email")
            .notEmpty()
            .isString()
            .trim()
            .isEmail()
            .custom(async (value: string) => {
                const userExists = await userModel.exists({ email: value });
                /* return a truthy value to indicate that the field is valid, or falsy to indicate it's invalid.
                If a custom validator throws an error, it's also considered invalid.*/
                if (userExists) throw new Error("E-mail already in use");
            }),
        body("password")
            .notEmpty()
            .withMessage("Password is required")
            .isString()
            .isAlphanumeric()
            .withMessage("Password must be an alphanumeric value")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
        body("confirmPassword")
            .notEmpty()
            .isString()
            .custom((value: string, { req }) => {
                if (value !== req.body.password) throw new Error("Passwords must match");
                return true;
            }),
    ],
    userInfo: [param("id").notEmpty().isMongoId()],
    userUpdate: [
        param("id").notEmpty().isMongoId(),
        body("name").optional({ nullable: true }).isString().trim(), // by default only undefined is optional. With this option both null or undefined is to be considered optional
        body("email")
            .optional({ checkFalsy: true })
            .isString()
            .trim()
            .isEmail()
            .custom(async (value: string) => {
                const userExists = await userModel.exists({ email: value });
                /* return a truthy value to indicate that the field is valid, or falsy to indicate it's invalid.
                If a custom validator throws an error, it's also considered invalid.*/
                if (userExists) throw new Error("E-mail already in use");
            }),
        body("password")
            .optional({ nullable: true })
            .isString()
            .isAlphanumeric()
            .withMessage("Password must be an alphanumeric value")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
        body("confirmPassword").custom((value: string, { req }) => {
            if (value !== req.body.password) throw new Error("Passwords must match");
            return true;
        }),
    ],
};
