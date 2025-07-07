import { NextResponse } from "next/server";
import products  from "../db/products.json";

export async function GET(request) {
  try {
    // Sun'iy kechikish
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}