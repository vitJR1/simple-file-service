import { User } from "./entity/user.js";

export const userInfo = async ({ user }) => {
  return await User.findOne({ where: { id: user.id } });
};
