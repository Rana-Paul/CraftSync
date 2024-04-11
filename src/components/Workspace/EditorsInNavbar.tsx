"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface EditorAccountNav {
  email: string | undefined;
  name: string;
  imageUrl: string;
  buttonStatus: boolean;
  workspaceId: string;
  editorId: string;
}

const EditorsInNavbar = ({
  email,
  imageUrl,
  name,
  buttonStatus,
  workspaceId,
  editorId,
}: EditorAccountNav) => {
  const queryClient = useQueryClient();
  // TODO:
  // delete editor mutation
  const { mutate } = useMutation({
    mutationKey: ["deleteEditor"],
    mutationFn: async () => {
      const response = await fetch("/api/editors", {
        method: "DELETE",
        body: JSON.stringify({ editorId, workspaceId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(await response.json());
      return response.json();
    },
    onSuccess: async (data) => {
      if (data.status === 403) {
        // logic for workspace already exists error (UI)
        toast.error(data.message);
      } else {
        // OR logic for workspace created (UI)
        queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        toast.success(data.message);
      }
    },
    onError: (_, message) => {
      // Internal server error
      console.log("error", message);
      toast.error(
        "There was an error while creating your workspace, please try again later"
      );
    },
  });


  const deleteEditor = async () => {
    console.log(editorId, workspaceId);
    await mutate();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button className="rounded-full h-8 w-8 aspect-square bg-slate-400">
          <Avatar className="relative w-8 h-8">
            {imageUrl ? (
              <div className="relative aspect-square h-full w-full">
                <Image
                  fill
                  src={imageUrl}
                  alt="profile picture"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <AvatarFallback>
                <span className="sr-only">{name}</span>
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            {name && <p className="font-medium text-sm text-black">{name}</p>}
            {email && (
              <p className="w-[200px] truncate text-xs text-zinc-700">
                {email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Button
            disabled={!buttonStatus}
            onClick={() => deleteEditor()}
            className={cn(
              buttonVariants({ variant: "destructive", size: "sm" }),
              "w-full"
            )}
          >
            Remove Editor
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditorsInNavbar;
