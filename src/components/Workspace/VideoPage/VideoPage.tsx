import { Loader2 } from "lucide-react";
import React, { FC, useState } from "react";
import Video from "./Video";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  VideoMetaDataType,
  videoMetadataSchema,
} from "@/lib/validators/video-metadata";
import { Button, buttonVariants } from "@/components/ui/button";
import { X } from "lucide-react";

interface VideoPageProps {}

const VideoPage: FC<VideoPageProps> = ({}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagValue, setTagsValue] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const addTags = (e: any) => {
    if (e.key === "Enter" && tags) {
      e.preventDefault();
      setTags((prevTags) => [...prevTags, tagValue]);
      setTagsValue("");
    }
  };

  const deleteTags = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<VideoMetaDataType>({
    resolver: zodResolver(videoMetadataSchema),
  });

  const submit: SubmitHandler<any> = async (data, event) => {
    setIsSubmitting(true);

    // Mutation for update video metadata

    console.log(data);
    setIsSubmitting(false);
  };

  // Get metadata from db

  return (
    <>
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mt-8 flow-root sm:mt-5">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <Video url="https://utfs.io/f/b99b4e90-1c38-4836-b69a-85c708d1dd7d-1uswaj.mp4" />
          </div>
        </div>
      </div>

      {/* Form page */}
      <MaxWidthWrapper>
        <form className="w-full mt-6" onSubmit={handleSubmit(submit)}>
          {/* Ttile */}
          <h2 className="text-md font-semibold">Add Title</h2>
          <input
            type="text"
            className="w-full mt-1 rounded-sm"
            placeholder="Enter your video title"
            {...register("title", { required: "Title is required" })}
          />

          <div className="h-3">
            {errors.title?.message && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          {/* Description */}
          <h2 className="text-md mt-1 font-semibold">Add Description</h2>
          <textarea
            className="w-full mt-2 h-[175px] rounded-sm resize-none"
            placeholder="Enter your video Description"
            {...register("description")}
          />

          <div className="h-3">
            {errors.description?.message && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          {/* Tag Inputs */}
          <div>
            <div className="flex-col">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 m-2"
                  onClick={() => {
                    deleteTags(index);
                  }}
                >
                  {tag} <X className="inline-block h-3 w-3 text-gray-600" />
                </div>
              ))}
            </div>
            <div>
              <input
                type="text"
                className="w-full mt-1 rounded-sm"
                placeholder="Add tags"
                onChange={(e) => setTagsValue(e.target.value)}
                onKeyDown={addTags}
                value={tagValue}
              />
            </div>
          </div>

          {/* TODO: Add all input boxes */}
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
    </>
  );
};

export default VideoPage;
