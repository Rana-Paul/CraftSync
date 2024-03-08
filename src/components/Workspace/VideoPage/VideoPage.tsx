import { Loader2 } from "lucide-react";
import { FC, useState } from "react";
import Video from "./Video";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VideoMetaDataType, videoMetadataSchema } from "@/lib/validators/video-metadata";
import { Button, buttonVariants } from "@/components/ui/button";

interface VideoPageProps {}

const VideoPage: FC<VideoPageProps> = ({}) => {

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<VideoMetaDataType>({
    resolver: zodResolver(videoMetadataSchema),
  });

  const submit: SubmitHandler<any> = async (data) => {
    setIsSubmitting(true);

    // Mutation for update video metadata

    console.log(data);
  };
  
  // Get metadata from db

  return (
    <>
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mt-8 flow-root sm:mt-5">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <Video url="https://utfs.io/f/b99b4e90-1c38-4836-b69a-85c708d1dd7d-1uswaj.mp4"/>
          </div>
        </div>
      </div>

      {/* TODO:  Form page */}
      <div>

        <MaxWidthWrapper>

      <form className="w-full mt-2" onSubmit={handleSubmit(submit)}>
          <h2 className="text-md font-semibold">Add Title</h2>
          <input
            type="text"
            className="w-full mt-2 rounded-sm"
            placeholder="Enter your video title"
            {...register("title", { required: "Name is required" })}
          />

          <div className="h-3">
            {errors.title?.message && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <Button
            className={buttonVariants({
              size: "sm",
              className: "mt-3",
              variant: "default",
            })}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </form>
        </MaxWidthWrapper>
        
      </div>
      </>
  );
};

export default VideoPage;
