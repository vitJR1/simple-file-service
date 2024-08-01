import { Router } from "express";
import multer from "multer";
import { authorization } from "./auth/authorization.js";
import asyncHandler from "./utils/asyncHandler.js";
import { uploadFile } from "../modules/file/uploadFile.js";
import { fileList } from "../modules/file/fileList.js";
import { removeFile } from "../modules/file/removeFile.js";
import { fileInfo } from "../modules/file/fileInfo.js";
import { updateFile } from "../modules/file/updateFile.js";
import { downloadFile } from "../modules/file/downloadFile.js";

const fileRouter = Router();

fileRouter.use(authorization);

fileRouter.post("/file/upload", multer().single(), asyncHandler(uploadFile));

fileRouter.get("/file/list", asyncHandler(fileList));

fileRouter.delete("/file/delete/:id", asyncHandler(removeFile));

fileRouter.get("/file/:id", asyncHandler(fileInfo));

fileRouter.get("/file/download/:id", asyncHandler(downloadFile));

fileRouter.put("/file/update/:id", multer().single(), asyncHandler(updateFile));

export { fileRouter };
