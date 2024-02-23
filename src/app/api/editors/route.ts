import { db } from "@/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

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
