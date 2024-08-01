import { File } from "../../core/db/index.js";
import { RequestError } from "../../routes/utils/RequestError.js";

export const fileInfo = async ({ params }) => {
  const file = await File.findByPk(params.id);

  if (file === null) {
    throw new RequestError("File not found", 404);
  }

  return file;
};
