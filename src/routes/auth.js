import { Router } from "express";
import { authorization } from "./auth/authorization.js";
import asyncHandler from "./utils/asyncHandler.js";
import { singin } from "../modules/auth/signin.js";
import { signinNewToken } from "../modules/auth/signinNewToken.js";
import { signup } from "../modules/auth/signup.js";
import { userInfo } from "../modules/users/info.js";
import { logout } from "../modules/auth/logout.js";
import { body } from "express-validator";

const authValidation = [
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

const authRouter = Router();

authRouter.post("/signin", authValidation, asyncHandler(singin));

authRouter.post("/signin/new_token", asyncHandler(signinNewToken));

authRouter.post("/signup", authValidation, asyncHandler(signup));

authRouter.get("/info", authorization, asyncHandler(userInfo));

authRouter.get("/logout", asyncHandler(logout));

export { authRouter };
