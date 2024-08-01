import { DataTypes } from "sequelize";
import sequelize from "../../../core/db/init.js";

export const User = await sequelize
  .define("user", {
    login: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
  .sync();
