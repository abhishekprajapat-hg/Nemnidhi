import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("image") as File;

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // Create a unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    
    // Ensure the images directory exists
    const publicImagesDir = path.join(process.cwd(), "public", "images");
    if (!fs.existsSync(publicImagesDir)) {
      fs.mkdirSync(publicImagesDir, { recursive: true });
    }

    const filepath = path.join(publicImagesDir, filename);
    fs.writeFileSync(filepath, buffer);

    const fileUrl = `/images/${filename}`;

    return NextResponse.json({ url: fileUrl }, { status: 201 });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ message: "File upload failed" }, { status: 500 });
  }
}
