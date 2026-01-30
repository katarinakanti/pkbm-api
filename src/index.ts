import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "../data-source";
import { uploadFileToSupabase, uploadMiddleware } from "../upload";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// --- MIDDLEWARE ---
app.use(cors()); // Critical: Allows your frontend to talk to this backend
app.use(express.json()); // Allows you to read JSON in request bodies

// --- DATABASE CONNECTION ---
// We initialize the DB connection once when the server starts
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

// --- ROUTES ---

// 1. Health Check (Useful for Vercel to check if app is alive)
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running and connected to Supabase!");
});

// 2. The Upload Route
// This replaces your old AWS S3 route.
// It uses the 'uploadMiddleware' (Multer) to grab the file,
// and 'uploadFileToSupabase' to send it to the cloud.
app.post(
  "/upload",
  uploadMiddleware.single("file"),
  async (req: Request, res: Response) => {
    try {
      // Validation: Did the user actually send a file?
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "No file uploaded" });
      }

      // Action: Upload to Supabase
      const publicUrl = await uploadFileToSupabase(req.file);

      // Response: Send the new URL back to the frontend
      return res.status(200).json({
        success: true,
        url: publicUrl,
      });
    } catch (error) {
      console.error("Upload Error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },
);

// 3. Your Other Routes (Example)
// If you have other logic (like creating users or posts), paste it here.
// Example:
// app.post("/users", async (req, res) => { ... })

// --- SERVER STARTUP ---

// Vercel Requirement: We must EXPORT the app
export default app;

// Local Development Requirement: We must LISTEN to a port
// This check ensures we don't try to listen twice when deployed
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`🚀 Server is running locally at http://localhost:${port}`);
  });
}
