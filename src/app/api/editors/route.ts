import { db } from "@/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { getInvitationCode } from "@/lib/invitation-code-generator";

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

// TODO: 
  // Invite Editor endpoint

export async function POST(request: NextRequest) {
  const session =  await getServerSession(authOptions);
  const {email, workspaceId} = await request.json();
  try {
    const isCreator = await db.workspace.findFirst({
      where: {
        AND: [
          {id: workspaceId},
          {creatorId: session?.user.id}
        ]
      }
    });

    if (!isCreator) {
      return NextResponse.json({
        message: "You are not authorized to invite editor",
        status: 401,
      });
    };

    const invitation_code = getInvitationCode();

    await db.invitation.create({
      data: {
        invitation_code: invitation_code,
        workspaceId: workspaceId,
        editorEmail: email
      }
    })

    return NextResponse.json({
      message: "Invitation sent successfully",
      status: 200
    })
  


  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// Delete editor api (Try)
// export async function DELETE(request: NextRequest) {
//   const session = await getServerSession(authOptions);
//   // const { id } = await request.json();
//   try {
//     const editor = await db.editor.deleteMany({
//       where: {
//         workspaceId: "clsxbvkmg000110oo0de3gt2d" as string,
//         editorId: "106790389685886129132"
//       },
//     });
//     return NextResponse.json(editor);
//   }
//   catch (error) {
//     throw new Error("Something went wrong");
//   }
// }
