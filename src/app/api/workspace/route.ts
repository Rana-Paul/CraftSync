import { db } from "@/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { createWorkspaceSchema } from "@/lib/validators/workspaces";

// create workspace
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const { title } = await request.json();
  const parseTitle = createWorkspaceSchema.parse(title);
  try {
    const workspace = await db.workspace.findFirst({
      where: {
        AND: [
          {
            creatorId: session?.user?.id as string,
          },
          {
            title: parseTitle.name,
          },
        ],
      },
    });

    if (workspace) {
      return NextResponse.json({
        message: "Workspace already exists",
        status: 409,
      });
    }
    const data = await db.workspace.create({
      data: {
        title: parseTitle.name,
        creatorId: session?.user?.id as string,
      },
    });
  console.log("work data: ",data);
    
    await db.video.create({
      data: {
        workspaceId: data.id
      },
    })

    return NextResponse.json({ message: "Workspace created successfully" });
  } catch (error) {
    return new Error("Something went wrong");
  }
}
// Get all workspaces by id
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  try {
    const workspaceAsCreator = await db.workspace.findMany({
      where: {
        creatorId: session?.user?.id as string,
      },
    });

    return NextResponse.json({ workspaceAsCreator });
  } catch (error) {
    return new Error("Something went wrong");
  }
}
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  const { id } = await request.json();
  console.log("deleted id: ", id);
  try {
    const isCreator = await db.workspace.findFirst({
      where: {
        AND: [
          {
            id: id,
          },
          {
            creatorId: session?.user.id,
          },
        ],
      },
    });

    if (!isCreator) {
      return NextResponse.json({
        message: "You have no access to delete this workspace",
        status: 403,
      });
    }
    

    await db.workspace.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ message: "Workspace deleted successfully" });
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// create a perfect route to create workspace
