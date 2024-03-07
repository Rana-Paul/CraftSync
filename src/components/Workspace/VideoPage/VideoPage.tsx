import { Loader2 } from "lucide-react";
import { FC, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Video from "./Video";

interface VideoPageProps {}

const VideoPage: FC<VideoPageProps> = ({}) => {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mt-8 flow-root sm:mt-5">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <Video />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
