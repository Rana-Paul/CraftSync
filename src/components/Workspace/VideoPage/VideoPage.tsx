"use client";
import { Loader2 } from "lucide-react";
import React, { ChangeEvent, FC, InputHTMLAttributes, useCallback, useState } from "react";
import Video from "./Video";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  VideoMetaDataType,
  videoMetadataSchema,
} from "@/lib/validators/video-metadata";
import { Button, buttonVariants } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { X } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface VideoPageProps {
  workspaceId: string;
}

const VideoPage: FC<VideoPageProps> = ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagValue, setTagsValue] = useState<string>("");
  const [uploadProgess, setUploadProgress] = useState<number>(0);
  const [isUploaading, setIsUploading] = useState<boolean>(false);

  const { data: session, status } = useSession();

  console.log("id:", workspaceId);

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

  // All Mutations
  const { mutate } = useMutation({
    mutationFn: async () => {},
  });

  // ----------- Progress bar logic ------------

  const startSimulatedProgress = () => {
    // setIsUploading(true);
    setUploadProgress(0);

    const intervel = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          // setIsUploading(false);
          clearInterval(intervel);
          return prev;
        }
        return prev + 5;
      });
    }, 1000);

    return intervel;
  };

  // ----------------- Upload video to s3 ----------------------

  const uploadVideo = async (video: File, data: ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    const progessIntervel = startSimulatedProgress();
    console.log(video.name);
    console.log(video.type);

    const uploadUrl = await fetch(
      `/api/presignurls?key=${session?.user?.id}/${workspaceId}/Video/${video.name}&type=${video.type}`,
      {
        method: "GET",
      }
    );

    if (!uploadUrl.ok) {
      toast.error("something went wrong, Please try again later");
      return;
    }
    const { url } = await uploadUrl.json();
    console.log(url);

    // Upload the video to s3

    const uploadToS3 = await fetch(url, {
      method: "PUT",
      body: video,
    });

    // Handle error of uploading video
    if (!uploadToS3.ok) {
      clearInterval(progessIntervel);
      setUploadProgress(100);
      setIsUploading(false);
      toast.error("something went wrong, Please try again later");
      return;
    }

    console.log(uploadToS3);

    //TODO: Generate get presign url for video

    const getVideoUrl = await fetch("/api/presignurls", {
      method: "POST",
      body: JSON.stringify({
        key: `${session?.user?.id}/${workspaceId}/Video/${video.name}`,
      }),
    });

    const { myVideoUrl } = await getVideoUrl.json();

    //TODO: Update video link to db
    const updateVideo = await fetch("/api/mediaupdate", {
      method: "PATCH",
      body: JSON.stringify({
        workspaceId,
        newUrl: myVideoUrl,
      }),
    })

    // TODO: Try Separate video upload and thumbnail upload 

    // Clear inputs and Interval
    data.target.value = '';

    clearInterval(progessIntervel);
    setUploadProgress(100);
    setIsUploading(false);
    toast.success("Video uploaded successfully");
  };

  // ----------------- Upload thumbnail to s3 ----------------------

  const uploadThumbnail = (thumb: File) => {
    console.log(thumb);
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

  //TODO: AWS Setup

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
      <MaxWidthWrapper className="mb-4">
        <div className="mt-8 items-center w-full h-full justify-between sm:flex mb-6">
          {/* Upload Video Button */}
          <div className="h-full">
            <input
              type="file"
              accept="images/*"
              id="video"
              className="hidden"
              onChange={(data) =>
                data.target.files && uploadVideo(data.target.files[0], data)
              }
            />
            <label
              className="cursor-pointer rounded-md bg-blue-600 p-3 text-sm font-medium text-white hover:bg-gray-700"
              htmlFor="video"
            >
              Select Video
            </label>
          </div>
          <div className=" mt-7 sm:mt-2">
            <input
              type="file"
              accept="images/*"
              id="video"
              className="hidden"
              onChange={(thumb) =>
                thumb.target.files && uploadThumbnail(thumb.target.files[0])
              }
            />
            <label
              className="cursor-pointer rounded-md bg-blue-600 p-3 text-sm font-medium text-white hover:bg-gray-700"
              htmlFor="video"
            >
              Select Thumbnail
            </label>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          {isUploaading && (
            <div className="w-full mt-4 max-w-xs mx-auto">
              <Dialog open={true}>
                <DialogContent>
                  <div className="w-full mt-4">
                    <Progress
                      indicatorColor={"bg-green-500"}
                      value={uploadProgess}
                      className="h-1 w-full bg-zinc-200 "
                    />

                    <div className="mt-2">
                      <span className="text-sm">
                        Uploading... {uploadProgess}%
                      </span>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        <form className="w-full" onSubmit={handleSubmit(submit)}>
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

          {/* video status */}
          <div className="mt-4">
            <h2 className="text-md mt-1 font-semibold">Select Video Status</h2>

            <select
              {...register("status")}
              name="status"
              id=""
              value="private"
              className="w-full mt-1 rounded-sm"
            >
              <option value="private">Public</option>
              <option value="public">Private</option>
            </select>
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
