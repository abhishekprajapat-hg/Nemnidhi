import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching blogs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const blog = await Blog.create({
      title: body.title,
      slug: body.slug,
      date: body.date,
      excerpt: body.excerpt,
      content: body.content,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      status: body.status || "published",
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating blog" }, { status: 500 });
  }
}
