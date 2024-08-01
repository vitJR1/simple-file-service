import { File } from "../../core/db/index.js";

export const fileInfo = async ({ params }) => {
  return await File.findByPk(params.id);
};
