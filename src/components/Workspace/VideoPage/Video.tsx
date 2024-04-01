import { Loader2 } from "lucide-react";
import { FC, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
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
        <MediaPlayer
          title="Sprite Fight"
          src={url}
          onPlay={() => console.log("play")}
          controls
          poster=""
        >
          <MediaProvider />
            
        </MediaPlayer>
      ) : (
        <Loader2 className="h-4 w-4 animate-spin" />
      )}
    </div>
  );
};

export default Video;

{
  /* <ReactPlayer
          width="100%"
          height="auto"
          url={url}
          controls={true}
          // light is usefull incase of dark mode
          // light="/img/poster2.png"
          // picture in picture
          pip={true}
          
        /> */
}
