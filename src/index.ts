require("dotenv").config();
import "reflect-metadata";
import cors from "cors";
import path from "path";
import { Server } from "@naiv/codegen-model-typeorm";
import { AppDataSource } from "../data-source";
import { getRouterUpload } from "../upload";

const server = new Server();

// CORS (important for Vercel frontend)
server.express?.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Mount routers (Naiv style)
server.express?.use(getRouterUpload());

server.run({
  port: +(process.env.PORT ?? 9415),
  types_path: path.resolve(__dirname, "types"),
  implementation_path: path.resolve(__dirname, "implementation"),
  async beforeStart() {
    await AppDataSource.initialize();
  },
});
