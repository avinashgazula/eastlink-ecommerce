import featuredCollection from "@/data/featured-collection.json";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(featuredCollection);
}
