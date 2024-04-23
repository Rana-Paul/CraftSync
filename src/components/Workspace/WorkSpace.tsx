"use client";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import CommentSection from "./CommentSection";
import VideoPage from "./VideoPage/VideoPage";
import VideoPageSkeleton from "./VideoPage/VideoPageSkeleton";

const WorkSpace = ({ id }: { id: string }) => {
  const [isCreator, setIsCreator] = useState(false);
  const {
    data: editors,
    isLoading,
    isError,
    isSuccess: getEditorsSuccess,
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

  // Get Initial Data
  const { data: videoData, isSuccess: getVideoDataSuccess } = useQuery({
    queryKey: ["getvideometadata"],
    queryFn: async () => {
      const res = await fetch(`/api/getvideometadata?workspaceId=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // console.log("res : ", await res.json());
      const resData = await res.json();
      console.log("resData : ", resData);
      

      return resData;
    },
  });

  if (isError) {
    toast.error("something went wrong, Please Reload the window");
  }

    console.log("videoData : ", videoData);
    

  const { data: session, status } = useSession();

  if (true) {
    return <VideoPageSkeleton />;
  }

  return (
    <>
    {getVideoDataSuccess? (
      <div className="w-full">
      <Navbar editors={editors} id={id} isCreator={videoData[1].isCreator} />

      <div className=" sm:flex-row sm:flex flex-col">
        {/* TODO: Design Video section */}
        <div className="w-full mt-4 sm:ml-5 ml-0">
          <VideoPage
            workspaceId={id}
            workspaceDescription={videoData[0].video.description}
            workspaceThumbnailUrl={videoData[0].video.thumbnail}
            workspaceVideoUrl={videoData[0].video.url}
            workspaceVideoStatus={videoData[0].video.videoStatus}
            workspacetags={videoData[0].video.tags}
            workspacetitle={videoData[0].video.title}
            workspaceIsCreator={videoData[1].isCreator}
          />
        </div>

        {/* SideBar for Comment section */}
        <div className="border-r w-full sm:w-[35%]">
          <CommentSection />
        </div>
      </div>
    </div>
    ): null}
    </> 
    
  );
};

export default WorkSpace;
