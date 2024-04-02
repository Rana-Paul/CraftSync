"use client";

import { ChangeEvent } from "react";

export const uploadVideoFile = async (
  video: File,
  userId: string | undefined,
  workspaceId: string
) => {
  const uploadUrl = await fetch(
    `/api/presignurls?key=${userId}/${workspaceId}/Files/${video.name}&type=${video.type}`,
    {
      method: "GET",
    }
  );

  if (!uploadUrl.ok) {
    return {
      status: false,
      msg: "something went wrong, Please try again later",
    };
  }
  const { url } = await uploadUrl.json();

  //   // Upload the video to s3

  const uploadToS3 = await fetch(url, {
    method: "PUT",
    body: video,
  });

  //   // Handle error of uploading video
  if (!uploadToS3.ok) {
    return {
      status: false,
      msg: "something went wrong, Please try again later",
    };
  }

  // Generate get presign url for video

  const getVideoUrl = await fetch("/api/presignurls", {
    method: "POST",
    body: JSON.stringify({
      key: `${userId}/${workspaceId}/Video/${video.name}`,
    }),
  });

  if (!getVideoUrl.ok) {
    return {
      status: false,
      msg: "something went wrong, Please try again later",
    };
  }

  const { myVideoUrl } = await getVideoUrl.json();

  // Update video link to db
  const updateVideo = await fetch("/api/mediaupdate", {
    method: "PATCH",
    body: JSON.stringify({
      workspaceId,
      newUrl: myVideoUrl,
    }),
  });

  if (!updateVideo.ok) {
    return {
      status: false,
      msg: "something went wrong, Please try again later",
    };
  }

  return {
    status: true,
    msg: "File uploaded successfully",
    myVideoUrl,
  };
};
