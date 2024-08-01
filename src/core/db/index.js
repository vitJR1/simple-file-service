import sequelize from "./init.js";
import User from "./entities/user.js";
import File from "./entities/file.js";

User.hasMany(File, { foreignKey: "userId", as: "files" });
File.belongsTo(User, { foreignKey: "userId", as: "user" });

await sequelize.sync();

export { User, File };
