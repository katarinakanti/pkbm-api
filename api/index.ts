import type { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import cors from "cors";

// ⬇️ import your Naiv-mounted router (or server)
import { getRouterUpload } from "../upload";
// If you have multiple routers, import them all

const app = express();

// IMPORTANT: middleware first
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount Naiv routers
app.use(getRouterUpload());
// app.use(getRouterAuth());
// app.use(getRouterAdmin());

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req as any, res as any);
}
