import { File } from "../../core/db/index.js";
import { RequestError } from "../../routes/utils/RequestError.js";
import * as fs from "fs";
import path from "path";

export const downloadFile = async ({ params }) => {
  const file = await File.findByPk(params.id);

  if (file === null) {
    throw new RequestError("File not found", 404);
  }

  return fs.readFileSync(path.join(file.destination, file.hash));
};
