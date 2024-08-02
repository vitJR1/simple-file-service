import multer from "multer";
import * as fs from "fs";
import * as path from "path";

fs.mkdirSync("src/uploads/", { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + crypto.randomUUID() + path.extname(file.originalname),
    );
  },
});

const fileFilter = (req, file, cb) => {
  console.log(file);
  return cb(null, true);
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: fileFilter,
});
