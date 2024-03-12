import { db } from "@/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {s3Client} from '@/app/helpers/s3client'

// ADD this route in middleware

export async function GET(request: Request) {
    // TODO: Add security to this route
    // TODO: Get Key and contentType as parameter
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: '/',
        ContentType: 'video/mp4',
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 28800 });
    console.log(url);
    
  return NextResponse.json({ url });
}
