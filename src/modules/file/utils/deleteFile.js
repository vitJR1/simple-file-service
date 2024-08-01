import * as fs from "fs";

export const deleteFile = (filePath) => {
  fs.unlinkSync(filePath);
};
