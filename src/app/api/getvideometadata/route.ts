import { db } from "@/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const workspaceId = request.nextUrl.searchParams.get("workspaceId");
  console.log("workspaceId: ", workspaceId);
  
  
  if(!session || !workspaceId) {
    return new Error("Something went wrong");
  }

  try {
    let creatorStatus = false
    const isCreator = await db.workspace.findFirst({
      where: {
        AND: [
          {id: workspaceId},
          {creatorId: session?.user?.id as string},
        ]
      }
    });

    if(isCreator) {
      creatorStatus = true
    }

    const isEditor = await db.editor.findFirst({
      where: {
        AND: [
          {workspaceId: workspaceId},
          {editorId: session?.user?.id as string},
        ]
      }
    });

    if(!isCreator && !isEditor) {
      return NextResponse.json({
        message: "You are not authorized to access this page",
        status: 401,
      });
    }
    
    
    const video = await db.video.findUnique({
      where: {
        workspaceId: workspaceId
      },
    });
    const videoData = [{video},{isCreator: creatorStatus}];
    return NextResponse.json(videoData);

  } catch (error) {
    return new Error("Something went wrong");
  }

  
}