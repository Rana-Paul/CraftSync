import { db } from "@/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    try {
        const addWorkSpace = await db.workspace.update({
            where: {
                id: "clsho3kmq00139y9mbjn7boq0",
            },
            data: {
                editors: {push: "new data"}
            },
        })
        return NextResponse.json({ message: "Workspace Created!" });
      } catch (error) {
        console.log("prisma: ",error);
        
        
      }
}