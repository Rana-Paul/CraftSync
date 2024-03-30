"use client";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { buttonVariants } from "../ui/button";
import { ArrowRight, Github, Loader2 } from "lucide-react";
import MobileNav from "./MobileNav";
import UserAccountNav from "./UserAccontNav";
import { useSession } from "next-auth/react";
import Link from "next/link";
const Navbar = () => {

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

          <MobileNav isAuth={!!session?.user} />

          <div className="hidden items-center space-x-4 sm:flex">
            {!session?.user ? (
              <>
                <Link
                  href="/"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  <Github className="h-5 w-5" />
                  Github
                </Link>
                <Link
                  href={"/auth/signin"}
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Sign in
                </Link>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Get started <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <div>
                <div className="flex space-x-2">
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                      className: "mt-2",
                    })}
                  >
                    Dashboard
                  </Link>
                  <div className="mt-2">

                  <UserAccountNav
                    name={
                      !session?.user.name
                        ? "Your Account"
                        : `${session?.user.name}`
                    }
                    email={session?.user.email ?? ""}
                    imageUrl={session?.user.image ?? ""}
                  />
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
