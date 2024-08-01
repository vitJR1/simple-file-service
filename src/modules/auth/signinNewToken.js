import jwt from "jsonwebtoken";
import { config } from "../../core/config/index.js";
import { Token } from "../../core/db/index.js";
import { RequestError } from "../../routes/utils/RequestError.js";

export const signinNewToken = async ({ body }) => {
  const token = await Token.findOne({
    where: {
      token: body.refreshToken,
    },
  });
  if (token === null) {
    throw new RequestError("Refresh token is invalid", 403);
  }
  const parsedRefreshToken = jwt.verify(
    body.refreshToken,
    config.refreshSecret,
  );
  return {
    accessToken: jwt.sign({ id: parsedRefreshToken.id }, config.accessSecret, {
      expiresIn: "10m",
    }),
  };
};
