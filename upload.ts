import { Request, Response, Router } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { getAdminFromAuthHeader } from "./jwt";
import * as dotenv from "dotenv";

dotenv.config();

// SUPABASE SETUP
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME || "images";

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase credentials are not configured");
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ROUTER
export function getRouterUpload() {
  const router_upload = Router();

  router_upload.post(
    "/upload",
    multer().any(),
    async (req: Request, res: Response) => {
      const authorization = req.headers.authorization ?? "";

      // ---- ADMIN AUTH ----
      try {
        await getAdminFromAuthHeader(authorization);
      } catch {
        res.status(401).end("This endpoint is restricted");
        return;
      }

      // ---- VALIDATION ----
      try {
        if (!(req as any).files || (req as any).files.length === 0) {
          res.status(400).end("Bad request");
          return;
        }

        const file = ((req as any).files as any)[0];
        const fileUrl = await uploadToSupabase(
          file.buffer,
          file.originalname,
          file.mimetype,
        );

        res.json(fileUrl);
      } catch (err: any) {
        console.error(err);
        res.status(500).end(err.toString());
      }
    },
  );

  // UPLOAD HELPER
  async function uploadToSupabase(
    buffer: Buffer,
    originalName: string,
    mimeType: string,
  ): Promise<string> {
    const extension = path.extname(originalName);
    const filename = `${uuidv4()}${extension}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, buffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  }

  return router_upload;
}
