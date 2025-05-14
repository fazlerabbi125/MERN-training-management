import { body } from "express-validator";

export const authValidator = {
    login: [
        body("email")
            .notEmpty()
            .withMessage("Email is required")
            .isString()
            .trim()
            .isEmail()
            .withMessage("Invalid e-mail given"),
        body("password")
            .notEmpty()
            .withMessage("Password is required")
            .isString()
            .isAlphanumeric()
            .withMessage("Password must be an alphanumeric value")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
    ],
    refreshToken: [body("token").notEmpty().withMessage("Token required").isString().trim()],
};
