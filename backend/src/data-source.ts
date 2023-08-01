import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite3",
  synchronize: true,
  logging: false,
  entities: ["./src/models/*.ts"],
  subscribers: [],
  migrations: [],
});
