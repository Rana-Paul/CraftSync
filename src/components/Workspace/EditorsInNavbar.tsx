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
import { useMutation } from "@tanstack/react-query";

interface EditorAccountNav {
  email: string | undefined;
  name: string;
  imageUrl: string;
  buttonStatus: boolean;
  workspaceId: string;
  editorId: string;
}


const EditorsInNavbar = ({ email, imageUrl, name, buttonStatus, workspaceId, editorId }: EditorAccountNav) => {
  // TODO:
  // delete editor mutation
  const {mutate} = useMutation({
    mutationKey: ["deleteEditor"],
    mutationFn: async ({ deleteEditorId, deleteWorkspaceId }: { deleteEditorId: string; deleteWorkspaceId: string }) => {
      // const response = await fetch("/api/editors", {
      //   method: "DELETE",
      //   body: JSON.stringify({ editorId, deleteWorkspaceId }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
  
      // console.log(await response.json());
      
    }
  })
  // delete editor api
  // delete editor from workspace

  const deleteEditor = () => {
    console.log(editorId, workspaceId);
    // mutate({ deleteEditorId: editorid, deleteWorkspaceId: workspaceId })
  }
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
