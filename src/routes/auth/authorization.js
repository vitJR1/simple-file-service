import { verify } from "jsonwebtoken";

export const authorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    req.user = verify(token);

    next();
  } catch (e) {
    res.status(401).send("Unauthorized");
  }
};
