import { config } from "../config/index.js";
import { Sequelize } from "sequelize";

export default new Sequelize(config.db, {
  dialect: "mysql",
  sync: { alter: true },
});
