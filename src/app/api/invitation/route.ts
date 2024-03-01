import { db } from "@/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const { workspaceId, code, name } = await request.json();
  try {
    
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
