import { compareSync } from "bcrypt";

import { User } from "../../core/db/index.js";
import { RequestError } from "../../routes/utils/RequestError.js";
import jwt from "jsonwebtoken";
import { config } from "../../core/config/index.js";

export const singin = async ({ body }) => {
  const user = await User.findOne({ where: { login: body.login } }).then(
    (result) => result.dataValues,
  );

  if (!compareSync(body.password, user.password)) {
    throw new RequestError("Incorrect password", 403);
  }

  const refreshToken = jwt.sign(
    {
      id: user.id,
    },
    config.secret,
    {
      expiresIn: "30d",
    },
  );

  const accessToken = jwt.sign(
    {
      id: user.id,
    },
    config.secret,
    {
      expiresIn: "10m",
    },
  );

  return {
    accessToken,
    refreshToken,
  };
};
