import { File } from "../../core/db/index.js";
import path from "path";
import { deleteFile } from "./utils/deleteFile.js";

export const updateFile = async ({ file, user, params }) => {
  const oldFileData = await File.findByPk(params.id);
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
  );
};
