import { Loader2 } from "lucide-react";
import { FC, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { MediaPlayer, MediaProvider, Thumbnail } from "@vidstack/react";
interface VideoProps {
  url: string;
  thumbnail: string;
}

const Video: FC<VideoProps> = ({ url, thumbnail }) => {
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
          poster={thumbnail}
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
