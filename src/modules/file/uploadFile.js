import { File } from "../../core/db/index.js";
import path from "path";
import { RequestError } from "../../routes/utils/RequestError.js";

export const uploadFile = async ({ file, user }) => {
  if (file === undefined) {
    throw new RequestError("File required");
  }
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
