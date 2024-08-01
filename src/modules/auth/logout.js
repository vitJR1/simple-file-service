import { Token } from "../../core/db/index.js";

export const logout = async ({ body }) => {
  await Token.destroy({
    where: {
      token: body.refreshToken,
    },
  });
};
