import { db } from "@/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import {generateUploadUrl} from '@/app/helpers/s3client'

export async function POST(request: Request) {
  const presignUrl = generateUploadUrl({key: 'video', contentType: 'video/mp4'});
  return NextResponse.json({ url: presignUrl });
}
