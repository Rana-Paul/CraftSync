"use client";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Loader2 } from "lucide-react";
import UserAccountNav from "../Navbar/UserAccontNav";
import { useSession } from "next-auth/react";
import Link from "next/link";
import InviteEditorButton from "./InviteEditorButton";
import EditorAccountNav from "./EditorsInNavbar";
import { useQuery } from "@tanstack/react-query";
import { GetEditorResType } from "@/lib/validators/editor";
import toast from "react-hot-toast";
import { useState } from "react";
import Navbar from "./Navbar";

const WorkSpace = ({ id }: { id: string }) => {
  const [isCreator, setIsCreator] = useState(false);
  const {
    data: editors,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["editors"],
    queryFn: async () => {
      const res = await fetch("/api/editors?id=" + id, {
        method: "GET",
      });

      // second api call to get workspace creator and set into the state
      return res.json();
    },
  });

  if (isError) {
    toast.error("something went wrong, Please Reload the window");
  }

  const { data: session, status } = useSession();

  if (status === "loading" || isLoading) {
    return <Loader2 className="h-4 w-4 animate-spin" />;
  }

  return (
    <>
      <Navbar editors={editors} id={id}/>

    {/* TODO: SideBar for Comment section */}

      <div>

      </div>
    </>
  );
};

export default WorkSpace;
