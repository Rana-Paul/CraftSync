import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/db";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const { workspaceId, title, description, status, tags } =
    await request.json();

  try {
    // throw new Error("Function not implemented.");
    const isCreator = await db.workspace.findUnique({
      where: {
        id: workspaceId,
      },
    });

    const isEditor = await db.editor.findFirst({
      where: {
        AND: [
          { workspaceId: workspaceId },
          { editorId: session?.user?.id as string },
        ],
      },
    });

    if (isCreator?.creatorId !== session?.user?.id && !isEditor) {
      return NextResponse.json({
        message: "You are not authorized to update video metadata",
        status: 401,
      });
    }

    await db.video.update({
      where: {
        workspaceId: workspaceId,
      },
      data: {
        title: title,
        description: description,
        videoStatus: status,
        tags: tags,
      },
    });

    return NextResponse.json({
      message: "Video metadata updated successfully",
      status: 200,
    });
  } catch (error) {
    throw new Error("Something went wrong");
  }

  // Check if user can update video metadata
}
