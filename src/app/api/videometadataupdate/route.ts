import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { videoId, title, description, status } = await request.json();
    console.log("videoId: ", videoId, "title: ", title, "description: ", description, "status: ", status);
    return NextResponse.json({ message: "Video metadata updated successfully" });

}