import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  ...(process.env.DATABASE_URL
    ? { url: process.env.DATABASE_URL }
    : {
        // Fallback: Only use these if DATABASE_URL is NOT present
        host: process.env.DB_HOST || "localhost",
        port: +(process.env.DB_PORT || 5432),
        username: process.env.DB_USERNAME || "postgres",
        password: process.env.DB_PASSWORD || "123123",
        database: process.env.DB_NAME || "ppdb",
      }),

  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,

  synchronize: false,
  logging: false,

  // Ensure we check for both .ts (dev) and .js (prod/Vercel)
  entities: [__dirname + "/types/model/**/*.{ts,js}"],
  migrations: [__dirname + "/migration/**/*.{ts,js}"],

  extra: {
    connectionTimeoutMillis: 10000,
  },
};

export const AppDataSource = new DataSource(dataSourceOptions);
