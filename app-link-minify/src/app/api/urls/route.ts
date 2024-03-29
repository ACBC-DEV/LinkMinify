import { connectDB } from "@/lib/mongodb";
import { randomNum } from "@/lib/utils";
import Hash from "@/models/hash";
import { nanoid } from "nanoid";

import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const result = await Hash.find();
  return NextResponse.json(result);
}
export async function POST(request: Request) {
  await connectDB();
  const res = await request.json();
  const result = await Hash.create({
    url: res.url,
    code: nanoid(randomNum()),
  });
  return NextResponse.json(result);
}
