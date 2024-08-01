import { File } from "../../core/db/index.js";

export const fileList = async ({ query }) => {
  return await File.findAndCountAll({
    offset: (query.list_size || 10) * ((query.page || 1) - 1),
    limit: query.list_size || 10,
  });
};
