import { File } from "../../core/db/index.js";
import path from "path";

export const uploadFile = async ({ body, file, user }) => {
  return await File.create({
    name: file.originalname,
    ext: path.extname(file.originalname),
    mime: file.mimetype,
    hash: file.filename,
    destination: file.destination,
    size: file.size,
    userId: user.id,
  });
};
