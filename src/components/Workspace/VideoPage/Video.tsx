import { Loader2 } from "lucide-react";
import { FC, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import thumb from "../../../../public/img/poster2.png";

interface VideoProps {
  url: string;
}

const Video: FC<VideoProps> = ({ url }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);
  return (
    <div suppressHydrationWarning={true} className="w-full">
      {isClient ? (
        <ReactPlayer
          width="100%"
          height="auto"
          url={url}
          controls={true}
          // light is usefull incase of dark mode
          // light="/img/poster2.png"
          // picture in picture
          pip={true}
          
        />
      ) : (
        <Loader2 className="h-4 w-4 animate-spin" />
      )}
    </div>
  );
};

export default Video;
