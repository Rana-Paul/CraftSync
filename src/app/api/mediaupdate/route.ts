import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/db";
export async function PATCH(request: NextRequest) {
  console.log("insideeeeeeeeeeeeeeeeeeeeeeee---------------------");

  const { workspaceId } = await request.json();
  const { newUrl } = await request.json();

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
    },
  });

  if (!isAuth) {
    return NextResponse.json({
      message: "You are not authorized to update this workspace",
      status: 401,
    });
  }

  console.log("here: ", isAuth.Video);

  return NextResponse.json({});
}
