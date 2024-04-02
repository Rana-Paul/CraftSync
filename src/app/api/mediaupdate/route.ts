import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/db";
export async function PATCH(request: Request) {
  console.log("insideeeeeeeeeeeeeeeeeeeeeeee---------------------");

  const requestBody = await request.json(); // Parse JSON payload once

  const { workspaceId, newUrl, type } = requestBody; 

  console.log("new route: ", workspaceId, newUrl);

  const session = await getServerSession(authOptions);

  const isAuth = db.workspace.findFirst({
    where: {
      AND: [
        {
          id: workspaceId,
          
        },
        {
          Editor: {
            some: {
              editorId: session?.user?.id,
            },
          },
        },
      ],
    }
  });

  if (!isAuth) {
    return NextResponse.json({
      message: "You are not authorized to update this workspace",
      status: 401,
    });
  }

  if(type === "image") {
    const updateImage = await db.video.update({
      where: {
        workspaceId,
      },
      data: {
        thumbnail: newUrl,
      }
    });
    return NextResponse.json({ message: "Image updated successfully", status: 200 });
    
  }

  const updateVideo = await db.video.update({
    where: {
      workspaceId,
    },
    data: {
      url: newUrl,
    }
  });

  console.log("updateVideo: ", updateVideo);
  


  return NextResponse.json({});
}

// Add a route for updating the image
