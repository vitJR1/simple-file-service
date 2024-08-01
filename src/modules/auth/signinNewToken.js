import jwt from "jsonwebtoken";
import { config } from "../../core/config/index.js";

export const signinNewToken = async ({ headers }) => {
  const parsedRefreshToken = jwt.verify(headers.authorization, config.secret);
  return {
    accessToken: jwt.sign({ id: parsedRefreshToken.id }, config.secret, {
      expiresIn: "10m",
    }),
  };
};
