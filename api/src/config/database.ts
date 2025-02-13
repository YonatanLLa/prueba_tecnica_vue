import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "challenge_api",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "admin123",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,
  }
);

export default sequelize;
