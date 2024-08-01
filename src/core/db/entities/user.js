import { DataTypes } from "sequelize";
import sequelize from "../init.js";

const User = sequelize.define("user", {
  login: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
