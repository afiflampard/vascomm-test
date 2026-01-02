import express from "express";
import bodyParser from "body-parser";
import db from "./models/index.js";
import config from "./config.js";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

db.sequelize.sync().then(() => {
  app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
  });
});
