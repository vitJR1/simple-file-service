import { Router } from "express";
import multer from "multer";
import { authorization } from "./auth/authorization.js";

const fileRouter = Router();

fileRouter.use(authorization);

fileRouter.post("/file/upload", multer().single(), (req, res) => {});

fileRouter.get("/file/list", (req, res) => {});

fileRouter.delete("/file/delete/:id", (req, res) => {});

fileRouter.get("/file/:id", (req, res) => {});

fileRouter.get("/file/download/:id", (req, res) => {});

fileRouter.put("/file/update/:id", multer().single(), (req, res) => {});

export { fileRouter };
