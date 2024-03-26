import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { workspaceId, title, description, status, tags } = await request.json();
    console.log("workspaceId: ", workspaceId, "title: ", title, "description: ", description, "status: ", status, "tags: ", tags);
    return NextResponse.json({ message: "Video metadata updated successfully" });

}