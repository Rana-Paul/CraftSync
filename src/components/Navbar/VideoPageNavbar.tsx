"use client";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { buttonVariants } from "../ui/button";
import { ArrowRight, Github, Loader2 } from "lucide-react";
import MobileNav from "./MobileNav";
import UserAccountNav from "./UserAccontNav";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const VideoPageNavbar = ({ id }: { id: string }) => {
  const pathname = usePathname();
  console.log(pathname);

  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Loader2 className="h-4 w-4 animate-spin" />;
  }
  if (pathname.includes("/dashboard/")) {
    console.log("inside");
  }

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex text-2xl z-40 font-semibold">
            Craft<span className="text-blue-600">Sync</span>
          </Link>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default VideoPageNavbar;
