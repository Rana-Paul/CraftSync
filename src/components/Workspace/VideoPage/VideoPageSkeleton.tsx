import { FC } from "react";
import Skeleton from "react-loading-skeleton";

interface VideoPageSkeletonProps {}

const VideoPageSkeleton: FC<VideoPageSkeletonProps> = ({}) => {
  return (
    <div className="flex justify-center items-center mt-6 rounded-sm">
      <div className="w-[60%]">
        <Skeleton height={500} />
      </div>
    </div>
  );
};

export default VideoPageSkeleton;
