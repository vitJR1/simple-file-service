import { File } from "../../core/db/index.js";
import path from "path";
import { deleteFile } from "./utils/deleteFile.js";
import { RequestError } from "../../routes/utils/RequestError.js";

export const updateFile = async ({ file, user, params }) => {
  if (file === undefined) {
    throw new RequestError("File required");
  }
  const oldFileData = await File.findByPk(params.id);
  if (oldFileData === null) {
    throw new RequestError("File not found", 404);
  }

  deleteFile(path.join(oldFileData.destination, oldFileData.hash));
  return await File.update(
    {
      name: file.originalname,
      ext: path.extname(file.originalname),
      mime: file.mimetype,
      hash: file.filename,
      destination: file.destination,
      size: file.size,
      userId: user.id,
    },
    {
      where: {
        id: params.id,
      },
    },
  ).then(async () => {
    return await File.findByPk(params.id);
  });
};
