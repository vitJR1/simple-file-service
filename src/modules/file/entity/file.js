import { DataTypes } from "sequelize";
import sequelize from "../../../core/db/init.js";

export const File = await sequelize
  .define("file", {
    name: DataTypes.STRING,
    ext: DataTypes.STRING,
    mime: DataTypes.STRING,
    size: DataTypes.NUMBER,
    date: DataTypes.NOW,
  })
  .sync();
