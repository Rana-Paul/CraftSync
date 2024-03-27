import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/db";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    const { workspaceId, title, description, status, tags } = await request.json();
    console.log("workspaceId: ", workspaceId, "title: ", title, "description: ", description, "status: ", status, "tags: ", tags);

    // Check if user can update video metadata
    const isCreator = await db.workspace.findUnique({
        where: {
            id: workspaceId
        }
    });

    const isEditor = await db.editor.findFirst({
        where:{
            AND: [
                {workspaceId: workspaceId},
                {editorId: session?.user?.id as string},
            ]
        }
    })

    if(isCreator?.creatorId !== session?.user?.id && !isEditor) {
        return NextResponse.json({ message: "You are not authorized to update video metadata", status: 401 });
    }
    

    if(title.length > 0) {
        const res = await db.video.update({
            where: {
                workspaceId: workspaceId
            },
            data: {
                title
            }
        });
    }
    if(description.length > 0) {
        const res = await db.video.update({
            where: {
                workspaceId: workspaceId
            },
            data: {
                description
            }
        });

    }
    if(status.length > 0) {
        const res = await db.video.update({
            where: {
                workspaceId: workspaceId
            },
            data: {
                videoStatus: status
            }
        });

    }
    if(tags.length > 0) {
        console.log("fuck");
        
        const res = await db.video.update({
            where: {
                workspaceId: workspaceId
            },
            data: {
                tags
            }
        });
    }

    // if exists, update video metadata
        // check which data to update

        console.log("Video metadata updated successfully");
        

    return NextResponse.json({ message: "Video metadata updated successfully" });

}