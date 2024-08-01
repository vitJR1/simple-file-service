import { Router } from "express";
import { authorization } from "./auth/authorization.js";
import asyncHandler from "./utils/asyncHandler.js";
import { singin } from "../modules/auth/signin.js";
import { signinNewToken } from "../modules/auth/signinNewToken.js";
import { signup } from "../modules/auth/signup.js";
import { userInfo } from "../modules/users/info.js";
import { logout } from "../modules/auth/logout.js";
import { authValidation } from "./utils/authValidation.js";

const authRouter = Router();

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Sign in a user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 default: email@gmail.com
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successful signin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: Invalid username or password
 *       500:
 *         description: Internal server error
 */
authRouter.post("/signin", authValidation, asyncHandler(singin));

/**
 * @swagger
 * /signin/new_token:
 *   post:
 *     summary: Obtain a new access token using a refresh token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             required:
 *               - refreshToken
 *     responses:
 *       200:
 *         description: New access token generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Invalid or expired refresh token
 *       500:
 *         description: Internal server error
 */
authRouter.post("/signin/new_token", asyncHandler(signinNewToken));

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 default: email@gmail.com
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *               - email
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
authRouter.post("/signup", authValidation, asyncHandler(signup));

/**
 * @swagger
 * /info:
 *   get:
 *     summary: Get information about the authenticated user
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 login:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
authRouter.get("/info", authorization, asyncHandler(userInfo));

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Log out the user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             required:
 *               - refreshToken
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       500:
 *         description: Internal server error
 */
authRouter.get("/logout", asyncHandler(logout));

export { authRouter };
