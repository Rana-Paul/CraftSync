"use client";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Loader2 } from "lucide-react";
import UserAccountNav from "../Navbar/UserAccontNav";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import InviteEditorButton from "./InviteEditorButton";
import EditorAccountNav from "./EditorAccountNav";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { GetEditorResType } from "@/lib/validators/editor";
import toast from "react-hot-toast";

const WorkSpace = ({ id }: { id: string }) => {
  const { data: editors, isLoading, isError } = useQuery({
    queryKey: ["editors"],
    queryFn: async () => {
      const res = await fetch("/api/editors?id=" + id, {
        method: "GET",
      });
      return res.json();
    },
  });
  
  if(isError){
    toast.error("something went wrong, Please Reload the window");
  }

  // TODO:
  // add error handling
  // add empety editor logic

  const { data: session, status } = useSession();

  if (status === "loading" || isLoading) {
    return <Loader2 className="h-4 w-4 animate-spin" />;
  }

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex text-2xl z-40 font-semibold">
            Craft<span className="text-blue-600">Sync</span>
          </Link>

          {/*   Video page navbar for mobile */}

          <div className="hidden items-center space-x-4 sm:flex">
            {editors?.map((editor: GetEditorResType, index: string) => (
              <div className="relative aspect-square h-full w-full" key={index}>
                <EditorAccountNav
                  imageUrl={editor.editor.avatar}
                  name={editor.editor.name}
                  email={editor.editor.email}
                />
              </div>
            ))}
            <InviteEditorButton />
            <UserAccountNav
              name={
                !session?.user.name ? "Your Account" : `${session?.user.name}`
              }
              email={session?.user.email ?? ""}
              imageUrl={session?.user.image ?? ""}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default WorkSpace;
