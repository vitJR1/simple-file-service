import { config } from "../config/index.js";
import { Sequelize } from "sequelize";

export default new Sequelize(config.db, {
  dialect: "mysql",
  sync: { alter: true },
  retry: {
    match: [
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/,
    ],
    max: 5,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
  dialectOptions: {
    connectTimeout: 60000,
  },
});
