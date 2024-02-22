import { db } from "@/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { createWorkspaceSchema } from "@/lib/validators/workspaces";

// create workspace
export async function GET(request: Request) {
    // const {id} = await request.json();
    const session = await getServerSession(authOptions);
    await db.editor.create({
      data: {
        editorId: session?.user.id as string,
        workspaceId: "clsx9z4lm0001wvzqiz4uf1q8",
      },
    });
    return NextResponse.json({ message: "Editor created" });
  
}