import { db } from "@/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const { workspaceId, code } = await request.json();
  try {
    const invitation =  await db.invitation.findFirst({
        where: {
            AND: [
                {invitation_code: code},
                {workspaceId: workspaceId}
            ]
        }
    });

    if (!invitation) {
        return NextResponse.json({
            message: "Invitation not found",
            status: 404
        })
    }
    if(invitation.invitation_code !== code){
        return NextResponse.json({
            message: "Invalid invitation code",
            status: 401
        })
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
