import sequelize from "./init.js";
import User from "./entities/user.js";
import File from "./entities/file.js";
import Token from "./entities/token.js";

User.hasMany(File, { foreignKey: "userId", as: "files" });
File.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Token, { foreignKey: "userId", as: "tokens" });
Token.belongsTo(User, { foreignKey: "userId", as: "user" });

await sequelize.sync();

export { User, File, Token };
