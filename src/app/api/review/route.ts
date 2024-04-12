import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/db";

export async function POST (request: NextRequest) {
    const session = await getServerSession(authOptions);
    const { workspaceId } = await request.json();

    const isAuth = await db.editor.findFirst({
        where: {
            AND: [
             {editorId: session?.user?.id as string},
             {workspaceId: workspaceId}   
            ]
        }
    });
    console.log("isAuth: -----------------------------", isAuth);
    

    if(!isAuth) {
        return NextResponse.json({
            message: "You have no access to review",
            status: 403
        })
    }



}