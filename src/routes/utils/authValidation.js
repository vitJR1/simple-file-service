import { body } from "express-validator";

export const authValidation = [
  body("login")
    .notEmpty()
    .withMessage("Login is required")
    .custom((value) => {
      const isEmail = /\S+@\S+\.\S+/.test(value);
      const isMobilePhone = /^\d{10,15}$/.test(value);
      if (!isEmail && !isMobilePhone) {
        throw new Error("Login must be a valid email or mobile phone number");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string"),
];
