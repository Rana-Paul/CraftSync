import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/helpers/s3client";

// ADD this route in middleware

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");
  const type = request.nextUrl.searchParams.get("type");

  // throw new Error();

  try {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: key as string,
      ContentType: type as string,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 28800 });
    console.log(url);
    return NextResponse.json({ url });
  } catch (error) {
    return new Error("Something went wrong");
  }
}
export async function POST(request: NextRequest) {
  const { key } = await request.json();
  // throw new Error();
  console.log(key);
  

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: key as string,
    });

    const myVideoUrl = await getSignedUrl(s3Client, command, { expiresIn: 7 * 24 * 60 * 60 });
    console.log("my video url: ",myVideoUrl);
    return NextResponse.json({ myVideoUrl });
  } catch (error) {
    return new Error("Something went wrong");
  }
}
