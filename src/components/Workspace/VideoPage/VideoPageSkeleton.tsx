import { FC } from "react";
import Skeleton from "react-loading-skeleton";

interface VideoPageSkeletonProps {}
const VideoPageSkeleton: FC<VideoPageSkeletonProps> = ({}) => {
  return (
    <div className="flex justify-center gap-14 items-center mt-6 rounded-sm">
      <div className="w-[60%]">
        <Skeleton height={500} />
        <div className="mt-4">
          <Skeleton height={30} />
        </div>
        <div className="mt-4">
          <Skeleton height={100} />
        </div>
      </div>
      <div className="">
        <Skeleton height={600} width={300} />
      </div>

      
    </div>
  );
};

export default VideoPageSkeleton;
