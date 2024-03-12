import { db } from "@/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import {s3Client} from '@/app/helpers/s3client'

export async function POST(request: Request) {
  
}
