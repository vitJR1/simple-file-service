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

/**
 * @swagger
 * /file/upload:
 *   post:
 *     summary: Upload a file
 *     tags:
 *       - Files
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: Invalid file upload
 *       500:
 *         description: Internal server error
 */
fileRouter.post(
  "/file/upload",
  upload.single("file"),
  asyncHandler(uploadFile),
);

/**
 * @swagger
 * /file/list:
 *   get:
 *     summary: List files
 *     tags:
 *       - Files
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: list_size
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Number of files to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of files
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   filename:
 *                     type: string
 *                   size:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /file/{id}:
 *   get:
 *     summary: Get file information
 *     tags:
 *       - Files
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the file to retrieve
 *     responses:
 *       200:
 *         description: File information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 filename:
 *                   type: string
 *                 mime:
 *                   type: string
 *                 size:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: File not found
 *       500:
 *         description: Internal server error
 */
fileRouter.get("/file/:id", asyncHandler(fileInfo));

/**
 * @swagger
 * /file/delete/{id}:
 *   delete:
 *     summary: Delete a file
 *     tags:
 *       - Files
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the file to delete
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       404:
 *         description: File not found
 *       500:
 *         description: Internal server error
 */
fileRouter.delete("/file/delete/:id", asyncHandler(removeFile));

/**
 * @swagger
 * /file/download/{id}:
 *   get:
 *     summary: Download a file
 *     tags:
 *       - Files
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the file to download
 *     responses:
 *       200:
 *         description: File downloaded successfully
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: File not found
 *       500:
 *         description: Internal server error
 */
fileRouter.get("/file/download/:id", asyncHandler(downloadFile));

/**
 * @swagger
 * /file/update/{id}:
 *   put:
 *     summary: Update an existing file
 *     tags:
 *       - Files
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the file to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File updated successfully
 *       400:
 *         description: Invalid file update
 *       404:
 *         description: File not found
 *       500:
 *         description: Internal server error
 */
fileRouter.put(
  "/file/update/:id",
  upload.single("file"),
  asyncHandler(updateFile),
);

export { fileRouter };
