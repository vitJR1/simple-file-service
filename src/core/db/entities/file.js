import { DataTypes } from "sequelize";
import sequelize from "../init.js";

const File = sequelize.define("files", {
  name: {
    type: DataTypes.STRING,
    allowNull: false, // You can specify if the field is required
  },
  ext: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.INTEGER, // Use INTEGER instead of NUMBER for size
    allowNull: false,
  },
});

export default File;
