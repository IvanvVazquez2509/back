import { Sequelize } from "sequelize-typescript";

const db: Sequelize = new Sequelize(
  process.env.DB_NAME || "db_eh_tasks",
  process.env.DB_USER || "user_base",
  process.env.DB_PASSWORD || "User00@@",
  {
    host: process.env.DB_IP || "eh-task-system-db.copfgv6xb39v.us-west-1.rds.amazonaws.com",
    port: 5432,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      dateStrings: true,
      typeCast: (field: any, next: any) => {
        if (field.type === "DATETIME") {
          return new Date(field.string() + "Z");
        }
        return next();
      },
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    timezone: process.env.TZ || "+00:00",
  }
);
export default db;
