import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { workspaceId, title, description, status, tags } = await request.json();
    console.log("workspaceId: ", workspaceId, "title: ", title, "description: ", description, "status: ", status, "tags: ", tags);

    // Check if user can update video metadata

    // check if video exists in the workspace

    // if exists, update video metadata
        // check which data to update

    return NextResponse.json({ message: "Video metadata updated successfully" });

}