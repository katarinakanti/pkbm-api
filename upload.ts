import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config();

// --- PART 1: SUPABASE SETUP ---
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials in .env");
}

const supabase = createClient(supabaseUrl, supabaseKey);
const BUCKET_NAME = "images"; // Make sure this bucket exists in Supabase

// --- PART 2: MULTER SETUP ---
// This keeps the file in RAM so we can pass it to Supabase manually.
const storage = multer.memoryStorage();

// Export this middleware so index.ts can use it
export const uploadMiddleware = multer({ storage: storage });

// --- PART 3: THE UPLOAD HELPER ---
// This function takes the file from RAM and sends it to Supabase
export const uploadFileToSupabase = async (file: Express.Multer.File) => {
  const filename = `${Date.now()}-${file.originalname}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filename, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (error) throw error;

  // Get the public URL
  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
};
