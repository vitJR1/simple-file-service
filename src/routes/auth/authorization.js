import jwt from "jsonwebtoken";
import { config } from "../../core/config/index.js";

export const authorization = async (req, res, next) => {
  try {
    const [type, token] = req.headers.authorization.split(" ");

    console.log(type, token);

    req.user = jwt.verify(token, config.accessSecret);

    next();
  } catch (e) {
    console.log(e);
    res.status(401).send("Unauthorized");
  }
};
