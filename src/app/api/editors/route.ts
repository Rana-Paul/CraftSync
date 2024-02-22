import { db } from "@/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { createWorkspaceSchema } from "@/lib/validators/workspaces";

// create workspace
export async function GET(request: NextRequest) {
    
    const id = request.nextUrl.searchParams.get("id");
    console.log("iddddd", id);
    
    
    const session = await getServerSession(authOptions);
    // await db.editor.create({
    //   data: {
    //     editorId: session?.user.id as string,
    //     workspaceId: "clsx9z4lm0001wvzqiz4uf1q8",
    //   },
    // });
    // return NextResponse.json({ message: "Editor created" });
    try {
        const editors = await db.editor.findMany({
            where:{
                workspaceId: id as string
            }
        });
        console.log(editors);
        
        
    } catch (error) {
        throw new Error("Something went wrong");

    }
  
}