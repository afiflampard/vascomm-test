import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import { fileURLToPath } from "url";
import config from "../config/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🔥 Sequelize Loaded");
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false,
  }
);

const db = {};

for (const file of fs.readdirSync(__dirname)) {
  if (file.endsWith(".model.js")) {
    const model = (await import(path.join(__dirname, file))).default;
    const instance = model(sequelize);
    db[instance.name] = instance;
  }
}

Object.values(db).forEach((model) => {
  if (model.associate) model.associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
