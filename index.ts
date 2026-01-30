require("dotenv").config();
import cors from "cors";
import "reflect-metadata";
// CHANGED: Added ./src/ because file is now in root
import { AppDataSource } from "./data-source";
import { Server } from "@naiv/codegen-model-typeorm";
import path from "path";
// CHANGED: Added ./src/
import { getRouterUpload } from "./upload";

const server = new Server();

server.express?.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

server.express?.use(getRouterUpload());

async function startServer() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("✅ Data Source initialized!");
    }

    const typesPath = path.join(__dirname, "src", "types");
    const implPath = path.join(__dirname, "src", "implementation");

    console.log("📂 Loading routes from:", typesPath);

    server.run({
      port: +(process.env.PORT ?? 8000),
      types_path: typesPath,
      implementation_path: implPath,
      async beforeStart() {
        console.log(`🚀 Server starting...`);
      },
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
}

startServer();

export default server.express;
