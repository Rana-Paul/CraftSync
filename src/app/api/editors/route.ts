import { db } from "@/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { invitationEmail } from "@/lib/send-emails";
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  // throw new Error();
  try {
    const editors = await db.editor.findMany({
      where: {
        workspaceId: id as string,
      },
      include: {
        editor: true,
      },
    });
    // console.log(editors);
    return NextResponse.json(editors);
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const { email, workspaceId }: { email: string; workspaceId: string } =
    await request.json();
  try {
    const isCreator = await db.workspace.findFirst({
      where: {
        AND: [{ id: workspaceId }, { creatorId: session?.user.id }],
      },
    });

    console.log("isCreator: ", isCreator);

    if (!isCreator) {
      return NextResponse.json({
        message: "You are not authorized to invite editor",
        status: 401,
      });
    }

    // check if editor already exists in the workspace


    const invitation_code = await nanoid(8);

    const data = await invitationEmail({
      email,
      invitation_code,
      workspaceName: isCreator.title,
      workspaceId,
    });
    console.log("errrr");

    if (!data) {
      throw new Error("Something went wrong");
    }

    await db.invitation.create({
      data: {
        invitation_code: invitation_code,
        workspaceId: workspaceId,
        editorEmail: email,
      },
    });

    return NextResponse.json({
      message: "Invitation sent successfully",
      status: 200,
    });
  } catch (error) {
    throw new Error("Something went wrong");
  }
}


export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const { editorId, workspaceId } = await request.json();
  console.log("deleted id: ", workspaceId);

  const isAuth = await db.workspace.findFirst({
    where: {
      AND: [
        {
          id: workspaceId,
        },
        {
          creatorId: session?.user.id,
        },
      ],
    },
  });

  if(!isAuth) {
    return NextResponse.json({
      message: "You have no access to delete the Editor",
      status: 403,
    });
  }

  // delete editor
 await db.editor.deleteMany({
   where: {
    AND: [
      {
        editorId: editorId
      },
      {
        workspaceId: workspaceId
      }
    ]
   }
 })

 return NextResponse.json({
   message: "Editor deleted successfully",
   status: 200
 })

  // TODO: add logic for deleting editor
}