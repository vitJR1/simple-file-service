import { hashSync, genSaltSync } from "bcrypt";
import { User } from "../../core/db/index.js";

export const signup = async ({ body }) => {
  return await User.create({
    login: body.login,
    password: hashSync(body.password, genSaltSync(12)),
  });
};
