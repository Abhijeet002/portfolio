import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`https://dev.to/api/articles?username=YOUR_USERNAME`);
  const blogs = await res.json();
  return NextResponse.json(blogs);
}
