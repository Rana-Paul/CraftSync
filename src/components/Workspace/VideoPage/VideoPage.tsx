import { Loader2 } from "lucide-react";
import { FC } from "react";
import Video from "./Video";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface VideoPageProps {}

const VideoPage: FC<VideoPageProps> = ({}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({
    resolver: zodResolver(""),
  });
  
  // Get metadata from db

  return (
    <MaxWidthWrapper>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mt-8 flow-root sm:mt-5">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <Video url="https://utfs.io/f/b99b4e90-1c38-4836-b69a-85c708d1dd7d-1uswaj.mp4"/>
          </div>
        </div>
      </div>

      {/* TODO:  Form page */}
      <div>
        
      </div>
    </MaxWidthWrapper>
  );
};

export default VideoPage;
