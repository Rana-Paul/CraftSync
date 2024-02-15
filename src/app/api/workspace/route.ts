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
    await db.workspace.create({
      data: {
        title: parseTitle.name,
        creatorId: session?.user?.id as string,
      },
    });

    return NextResponse.json({ message: "Workspace created" });
  } catch (error) {
    return new Error("Something went wrong");
  }
}
// Get all workspaces by id
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const { title } = await request.json();
  const parseTitle = createWorkspaceSchema.parse(title);
  try {
    const workspace = await db.workspace.findMany({
      where: {
        creatorId: session?.user?.id as string,
      },
    });

    return NextResponse.json({ workspace });
  } catch (error) {
    return new Error("Something went wrong");
  }
}

// create a perfect route to create workspace
