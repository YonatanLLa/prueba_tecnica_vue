import express, { Application } from "express";
import routes from "./routes";

import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Rutas base
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.use("/api", routes);

export default app;
