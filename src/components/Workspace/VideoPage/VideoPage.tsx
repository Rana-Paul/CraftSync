"use client";
import { Loader2 } from "lucide-react";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import Video from "./Video";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  VideoMetaDataType,
  videoMetadataSchema,
  UpdateVideoMetaDataType,
} from "@/lib/validators/video-metadata";
import { Button, buttonVariants } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { uploadFileToS3 } from "@/helpers/uploadMedia";
import Link from "next/link";

interface VideoPageProps {
  workspaceId: string;
  workspacetags: string[];
  workspacetitle: string;
  workspaceVideoUrl: string;
  workspaceThumbnailUrl: string;
  workspaceDescription: string;
  workspaceVideoStatus: string;
  workspaceIsCreator: boolean;
}

const VideoPage: FC<VideoPageProps> = ({
  workspaceId,
  workspacetags,
  workspacetitle,
  workspaceVideoUrl,
  workspaceThumbnailUrl,
  workspaceDescription,
  workspaceVideoStatus,
  workspaceIsCreator,
}) => {
  const [tags, setTags] = useState<string[]>(workspacetags);
  const [tagValue, setTagsValue] = useState<string>("");
  const [title, setTitle] = useState<string>(workspacetitle);
  // const [videoUrl, setVideoUrl] = useState<string>(workspaceVideoUrl);
  // const [thumbnailUrl, setThumbnailUrl] = useState<string>(
  //   workspaceThumbnailUrl
  // );
  const [videoStatus, setVideoStatus] = useState<string>(workspaceVideoStatus);
  const [description, setDescription] = useState<string>(workspaceDescription);
  const [uploadProgess, setUploadProgress] = useState<number>(0);
  const [isUploaading, setIsUploading] = useState<boolean>(false);
  const [isActiveButton, setIsAcctiveButton] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  console.log("taggg", tags);

  // Update VideoMeta Data mutation

  const { mutate } = useMutation({
    mutationKey: ["videometadataupdate"],
    mutationFn: async (data: UpdateVideoMetaDataType) => {
      const res = await fetch("/api/videometadataupdate", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await res.json();
    },
    onSuccess: async (data) => {
      setIsSubmitting(false);
      if (data.status === 401) {
        toast.error(data.message);
      } else {
        queryClient.invalidateQueries({ queryKey: ["getvideometadata"] });
        setIsAcctiveButton(true);
        toast.success(data.message);
      }
    },
    onError: (_, message) => {
      // Internal server error
      setIsSubmitting(false);
      console.log("error", message);
      toast.error("Something went wrong, please try again later");
    },
  });
  const { mutate: reviewMutation } = useMutation({
    mutationKey: ["review"],
    mutationFn: async () => {
      console.log("in mutation", workspaceId);
      
      const res = await fetch("/api/review", {
        method: "POST",
        body: JSON.stringify({workspaceId: workspaceId}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await res.json();
    },
    onSuccess: async (data) => {
      setIsSubmitting(false);
      if (data.status === 403 || data.status === 404) {
        toast.error(data.message);
        setIsAcctiveButton(true);

      } else {
        // queryClient.invalidateQueries({ queryKey: ["getvideometadata"] });
        setIsAcctiveButton(true);
        toast.success(data.message);
      }
    },

    //TODO: test the review route
    onError: (_, message) => {
      // Internal server error
      setIsSubmitting(false);
      toast.error("Something went wrong, please try again later");
    },
  });
  // TODO: Create a beautiful Loading Skeleton

  // Tags logic
  const addTags = (e: any) => {
    if (e.key === "Enter" && tags) {
      setIsAcctiveButton(false);
      e.preventDefault();
      setTags((prevTags) => [...prevTags, tagValue]);
      setTagsValue("");
    }
  };
  const deleteTags = (index: number) => {
    setIsAcctiveButton(false);
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

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
  // ----------- Progress bar logic ------------

  const review = () => {
    // setIsUploading(true);
    reviewMutation();
    
  };

  // ----------------- Upload video to s3 ----------------------

  const fileUpload = async (
    file: File,
    data: ChangeEvent<HTMLInputElement>,
    id: string | undefined,
    workspaceId: string
  ) => {
    setIsUploading(true);
    const progessIntervel = startSimulatedProgress();
    const fileUpload = await uploadFileToS3(file, id, workspaceId);

    // Handle error of uploading video
    if (!fileUpload.status) {
      // Clear inputs and Interval
      clearInterval(progessIntervel);
      setUploadProgress(100);
      setIsUploading(false);
      data.target.value = "";
      toast.error(fileUpload.msg);
      return;
    }
    // upload Successful
    clearInterval(progessIntervel);
    setUploadProgress(100);
    setIsUploading(false);
    data.target.value = "";
    toast.success(fileUpload.msg);
    queryClient.invalidateQueries({ queryKey: ["getvideometadata"] });
  };

  // ----------------- Upload thumbnail to s3 ----------------------

  // Desable update button logic
  const disableUpdateButton = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);

    if (
      event.target.name === "title" ||
      event.target.name === "description" ||
      event.target.name === "status"
    ) {
      setIsAcctiveButton(false);
    } else {
      setIsAcctiveButton(true);
    }
    // console.log(title);
  };

  // React form handler
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<VideoMetaDataType>({
    resolver: zodResolver(videoMetadataSchema),
  });

  // Submit Handler
  const submit: SubmitHandler<any> = async (data, event) => {
    // TODO: Update metadata on db
    setIsSubmitting(true);
    console.log("hereeeeeee is the issue----s");
    

    console.log(title);
    await mutate({
      title: title,
      description: description,
      status: videoStatus,
      tags: tags,
      workspaceId: workspaceId,
    });
  };

  return (
    <>
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mt-8 flow-root sm:mt-5">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <Video url={workspaceVideoUrl} thumbnail={workspaceThumbnailUrl} />
          </div>
        </div>
      </div>

      {/* Form wrapper */}
      <MaxWidthWrapper className="mb-4">
        {/* Video */}
        <div className="mt-8 items-center w-full h-full justify-between sm:flex mb-6">
          {/* Upload Video Button */}
          <div className="h-full">
            <input
              type="file"
              accept="images/*"
              id="video"
              className="hidden"
              onChange={(data) =>
                data.target.files &&
                fileUpload(
                  data.target.files[0],
                  data,
                  session?.user.id,
                  workspaceId
                )
              }
            />
            <label
              className="cursor-pointer rounded-md bg-blue-600 p-3 text-sm font-medium text-white hover:bg-gray-700"
              htmlFor="video"
            >
              Select Video
            </label>
          </div>

          {/* TODO: Show Thumbnail button */}
          <div className=" mt-7 sm:mt-2">
            <Link
              className="cursor-pointer rounded-md bg-blue-600 p-3 text-sm font-medium text-white hover:bg-gray-700"
              href={workspaceThumbnailUrl}
              target="_blank"
            >
              Show Thumbnail
            </Link>
          </div>

          {/* Upload Thumbnail Button */}
          <div className=" mt-7 sm:mt-2">
            <input
              type="file"
              accept="image/*"
              id="thumbnail"
              className="hidden"
              onChange={(data) =>
                data.target.files &&
                fileUpload(
                  data.target.files[0],
                  data,
                  session?.user.id,
                  workspaceId
                )
              }
            />
            <label
              className="cursor-pointer rounded-md bg-blue-600 p-3 text-sm font-medium text-white hover:bg-gray-700"
              htmlFor="thumbnail"
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

        {/* Form */}
        <form className="w-full" onSubmit={handleSubmit(submit)}>
          {/* Ttile */}
          <h2 className="text-md font-semibold">Add Title</h2>
          <input
            type="text"
            className="w-full mt-1 rounded-sm"
            placeholder="Enter your video title"
            defaultValue={title}
            {...register("title", {
              required: "Title is required",
              onChange(event) {
                setTitle(event.target.value);
                disableUpdateButton(event);
              },
            })}
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
            {...register("description", {
              onChange(event) {
                setDescription(event.target.value);
                disableUpdateButton(event);
              },
            })}
            defaultValue={description}
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
              {/* Rander Tags */}
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
              {...register("status", {
                onChange(event) {
                  setVideoStatus(event.target.value);
                  disableUpdateButton(event);
                },
              })}
              name="status"
              className="w-full mt-1 rounded-sm"
            >
              <option value="" disabled hidden>
                {videoStatus.length > 0 ? videoStatus : "Select Video Status"}
              </option>

              <option selected={videoStatus === "private"} value="private">
                private
              </option>
              <option selected={videoStatus === "public"} value="public">
                public
              </option>
            </select>
          </div>

          {/* TODO: Add all input boxes */}

          {workspaceIsCreator ? (
            <div className="flex justify-space-between">
              <div className="w-full">
                <Button
                  className={buttonVariants({
                    size: "sm",
                    className: "mt-3 ",
                    variant: "ghost",
                  })}
                  type="submit"
                  disabled={isSubmitting || isActiveButton}
                >
                  {isSubmitting ? "Updating..." : "Update"}
                </Button>
              </div>
              <div>
                <Button
                  className={buttonVariants({
                    size: "sm",
                    className:
                      "mt-3 bg-blue-700 hover:bg-blue-800 hover:text-white",
                    variant: "default",
                  })}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Uploading..." : "Upload"}
                </Button>
              </div>
            </div>
          ) : (
            // Editor button
            <div className="flex justify-space-between">
              <div className="w-full">
                <Button
                  className={buttonVariants({
                    size: "sm",
                    className: "mt-3 bg-blue-700 hover:bg-blue-800 hover:text-white",
                    variant: "default",
                  })}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update"}
                </Button>
              </div>
              <div>
                <Button
                  className={buttonVariants({
                    size: "sm",
                    className:
                      "mt-3",
                    variant: "default",
                  })}
                  onClick={review}
                  type="button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Review"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </MaxWidthWrapper>
    </>
  );
};
export default VideoPage;
