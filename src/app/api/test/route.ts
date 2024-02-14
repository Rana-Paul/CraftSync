import { db } from "@/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { createWorkspaceSchema } from "@/lib/validators/workspaces";

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
          }
        ]
      }
    });

    if (workspace) {
      return new Response("Workspace already exists", { status: 409 });
    }
    await db.workspace.create({
      data: {
        title: parseTitle.name,
        creatorId: session?.user?.id as string,
      },
    });
    return NextResponse.json({ message: "Workspace Created!", status: 200 });
  } catch (error) {
    console.log("prisma: ", error);
    return NextResponse.json({ message: error });
  }
}

// create a perfect route to create workspace
