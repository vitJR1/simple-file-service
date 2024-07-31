import { Router } from "express";
import { authorization } from "./auth/authorization.js";
import asyncHandler from "./utils/asyncHandler.js";
import { singin } from "../modules/auth/signin.js";
import { signinNewToken } from "../modules/auth/signinNewToken.js";
import { signup } from "../modules/auth/signup.js";
import { userInfo } from "../modules/users/info.js";
import { logout } from "../modules/auth/logout.js";

const authRouter = Router();

authRouter.post("/signin", asyncHandler(singin));

authRouter.post("/signin/new_token", asyncHandler(signinNewToken));

authRouter.post("/signup", asyncHandler(signup));

authRouter.get("/info", authorization, asyncHandler(userInfo));

authRouter.get("/logout", authorization, asyncHandler(logout));

export { authRouter };
