require("dotenv").config();
import cors from "cors";
import "reflect-metadata";
import { AppDataSource } from "../data-source";
import { Server } from "@naiv/codegen-model-typeorm";
import path from "path";
import { getRouterUpload } from "../upload";

// Create the Naiv Server
const server = new Server();

// 1. Middleware
server.express?.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

server.express?.use(getRouterUpload());

// 2. Define Paths specifically for Vercel
// Vercel runs from the root of the project
const PROJECT_ROOT = process.cwd();

// Adjust these paths. If your folders are inside 'src', include 'src'.
// If they are in the root, remove 'src'.
const typesPath = path.join(PROJECT_ROOT, "src", "types");
const implPath = path.join(PROJECT_ROOT, "src", "implementation");

// 3. Start Logic
// We wrap this so we can control how it starts based on the environment
async function bootstrap() {
  // Always init DB first
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log("✅ Data Source initialized");
  }

  // RUN THE SERVER
  // Naiv will scan 'typesPath' and 'implPath' to build your routes automatically.
  server.run({
    // Vercel assigns its own port, but we pass 3000 as a placeholder
    port: +(process.env.PORT ?? 3000),
    types_path: typesPath,
    implementation_path: implPath,
    async beforeStart() {
      // DB is already initialized above, so we can leave this empty or log
      console.log("🚀 Naiv is loading routes...");
    },
  });
}

// 4. Execution
bootstrap();

// 5. Export for Vercel
// Vercel requires us to export the Express app so IT can handle the connection
export default server.express;
