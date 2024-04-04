"use client";
import { signIn, useSession } from "next-auth/react";
import { FC, useState } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface acceptInvitationProps {
  workspaceName?: string;
  workspaceId: string;
  code: string;
}

export const AcceptInvitation: FC<acceptInvitationProps> = ({
  workspaceName,
  workspaceId,
  code,
}: acceptInvitationProps) => {
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const mutation = useMutation({
    mutationFn: async (data: acceptInvitationProps) => {
      const res = await fetch("/api/invitation", {
        method: "POST",
        body: JSON.stringify({
          code: data.code,
          workspaceId: data.workspaceId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // test

      return res.json();
    },

    onSuccess: async(data) => {
      setIsJoining(false);
      if (data.status === 404) {
        toast.error(data.message);
      }
      if (data.status === 401) {
        toast.error(data.message);
      }
       else {
        toast.success(data.message);
        window.location.href = "/dashboard";
      }
    },
  });

  const { data: session, status } = useSession();
  if (status === "loading") {
    // make a beautiful loader
    return <Loader2 className="h-4 w-4 animate-spin" />;
  }
  console.log(session?.user);

  return (
    <div>
      <MaxWidthWrapper className="mb-12 mt-20 sm:mt-20 flex flex-col items-center justify-center text-center">
        <h1 className="max-w-5xl text-6xl font-bold md:text-7xl lg:text-7xl">
          Craft<span className="text-blue-600">Sync</span>{" "}
        </h1>
        <p className="mt-5 max-w-[338px] text-zinc-700 text-balance sm:text-md">
          Elevate creativity with seamless collaboration. Effortless video
          syncing for your content creation joureny.
        </p>
        <p className="mt-4 font-bold text-zinc-700">
          You are Invited to join{" "}
          <span className="text-blue-600">{workspaceName}</span> workspace
        </p>

        {!session?.user ? (
          <button
            className={buttonVariants({ size: "lg", className: "mt-5" })}
            onClick={() =>
              signIn("google", {
                callbackUrl: `${process.env.NEXT_PUBLIC_URL}/accept-invitation?code=${code}&id=${workspaceId}&name=${workspaceName}`,
              })
            }
          >
            Login to Join
          </button>
        ) : (
          <button
            className={buttonVariants({
              size: "lg",
              className: "mt-5",
            })}
            onClick={() =>
              {
              setIsJoining(true);
              mutation.mutate({ code: code, workspaceId: workspaceId })
              }
            }
          >
            Join Workspace
          </button>
        )}
      </MaxWidthWrapper>
    </div>
  );
};
