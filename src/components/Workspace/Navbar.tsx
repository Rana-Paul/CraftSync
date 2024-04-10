"use client";
import { FC } from "react";
import InviteEditorButton from "./InviteEditorButton";
import UserAccountNav from "../Navbar/UserAccontNav";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";
import { GetEditorResType } from "@/lib/validators/editor";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import EditorsInNavbar from "./EditorsInNavbar";

interface NavbarProps {
  editors: GetEditorResType[] | undefined;
  id: string;
  isCreator: boolean;
}

const Navbar: FC<NavbarProps> = ({ editors, id, isCreator }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
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

          <div className="hidden items-center space-x-3 sm:flex">
            {editors?.map((editor: GetEditorResType, index: number) => (
              <div className="relative aspect-square h-full w-full" key={index}>
                <EditorsInNavbar
                  buttonStatus={isCreator}
                  imageUrl={editor.editor.avatar}
                  name={editor.editor.name}
                  email={editor.editor.email}
                  editorId={editor.editor.id}
                  workspaceId={id}
                />
              </div>
            ))}
            <span className="h-10 w-px bg-gray-200" />
            <InviteEditorButton workspaceId={id} />
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

export default Navbar;
