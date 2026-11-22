import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_IMAGES_BUCKET ?? "images";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) ?? "images";

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type. Upload an image (jpeg, png, webp, gif, svg)." },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large. Max size is 5 MB." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop() ?? "bin";
    const timestamp = Date.now();
    const random = crypto.randomUUID();
    const path = `${folder}/${timestamp}-${random}.${sanitizeFilename(ext)}`;

    const { error: uploadError } = await supabaseAdmin.storage.from(BUCKET).upload(path, buffer, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

    if (uploadError) {
      console.error("[upload] Supabase error:", uploadError);
      return NextResponse.json({ error: "Failed to upload image." }, { status: 502 });
    }

    const { data: urlData } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);

    return NextResponse.json({
      ok: true,
      path,
      url: urlData.publicUrl,
      mimeType: file.type,
      size: file.size,
    });
  } catch (error) {
    console.error("[upload] Unexpected error:", error);
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }
}
