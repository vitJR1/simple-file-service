import jwt from "jsonwebtoken";
import { config } from "../../core/config/index.js";

export const authorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    req.user = jwt.verify(token, config.secret);

    next();
  } catch {
    res.status(401).send("Unauthorized");
  }
};
