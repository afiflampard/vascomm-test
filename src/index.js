import express from "express";
import bodyParser from "body-parser";
import db from "./models/index.js";
import config from "./config/index.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from './docs/swagger.js';
import "./auth/google.js";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import passport from "passport";

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);


app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
})
