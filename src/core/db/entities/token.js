import { DataTypes } from "sequelize";
import sequelize from "../init.js";

const Token = sequelize.define("token", {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Token;
