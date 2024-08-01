import { Router } from "express";
import { authorization } from "./auth/authorization.js";
import asyncHandler from "./utils/asyncHandler.js";
import { uploadFile } from "../modules/file/uploadFile.js";
import { fileList } from "../modules/file/fileList.js";
import { removeFile } from "../modules/file/removeFile.js";
import { fileInfo } from "../modules/file/fileInfo.js";
import { updateFile } from "../modules/file/updateFile.js";
import { downloadFile } from "../modules/file/downloadFile.js";
import { query } from "express-validator";
import { upload } from "./utils/multer.js";

const fileRouter = Router();

fileRouter.use(authorization);

fileRouter.post(
  "/file/upload",
  upload.single("file"),
  asyncHandler(uploadFile),
);

fileRouter.get(
  "/file/list",
  [
    query("list_size")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("List size must be a positive integer and less or equal 100")
      .toInt(),
    query("page")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Page must be a non-negative integer")
      .toInt(),
  ],
  asyncHandler(fileList),
);

fileRouter.get("/file/:id", asyncHandler(fileInfo));

fileRouter.delete("/file/delete/:id", asyncHandler(removeFile));

fileRouter.get("/file/download/:id", asyncHandler(downloadFile));

fileRouter.put(
  "/file/update/:id",
  upload.single("file"),
  asyncHandler(updateFile),
);

export { fileRouter };
