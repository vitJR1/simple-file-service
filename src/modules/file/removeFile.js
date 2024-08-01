import { File } from "../../core/db/index.js";
import { deleteFile } from "./utils/deleteFile.js";
import path from "path";
import { RequestError } from "../../routes/utils/RequestError.js";

export const removeFile = async ({ params }) => {
  const file = await File.findByPk(params.id);

  if (file === null) {
    throw new RequestError("File not found", 404);
  }

  deleteFile(path.join(file.destination, file.hash));

  return { result: await File.destroy({ where: { id: params.id } }) };
};
