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

export const upload = multer({ storage: storage });
