"use client";

import { ChangeEvent } from "react";

export const uploadVideoFile = async (
    video: File,
    data: ChangeEvent<HTMLInputElement>,
    id: string | undefined,
    workspaceId: string

) => {
    console.log(video, data, id, workspaceId);
    
//   setIsUploading(true);
//   const progessIntervel = startSimulatedProgress();
//   console.log(video.name);
//   console.log(video.type);

//   const uploadUrl = await fetch(
//     `/api/presignurls?key=${userId}/${workspaceId}/Video/${video.name}&type=${video.type}`,
//     {
//       method: "GET",
//     }
//   );

//   if (!uploadUrl.ok) {
//     toast.error("something went wrong, Please try again later");
//     return;
//   }
//   const { url } = await uploadUrl.json();
//   console.log(url);

//   // Upload the video to s3

//   const uploadToS3 = await fetch(url, {
//     method: "PUT",
//     body: video,
//   });

//   // Handle error of uploading video
//   if (!uploadToS3.ok) {
//     clearInterval(progessIntervel);
//     setUploadProgress(100);
//     setIsUploading(false);
//     toast.error("something went wrong, Please try again later");
//     return;
//   }

//   console.log(uploadToS3);

//   //TODO: Generate get presign url for video

//   const getVideoUrl = await fetch("/api/presignurls", {
//     method: "POST",
//     body: JSON.stringify({
//       key: `${userId}/${workspaceId}/Video/${video.name}`,
//     }),
//   });

//   const { myVideoUrl } = await getVideoUrl.json();

//   // Update video link to db
//   const updateVideo = await fetch("/api/mediaupdate", {
//     method: "PATCH",
//     body: JSON.stringify({
//       workspaceId,
//       newUrl: myVideoUrl,
//     }),
//   });

//   if (!updateVideo.ok) {
//     clearInterval(progessIntervel);
//     setUploadProgress(100);
//     setIsUploading(false);
//     toast.error("something went wrong, Please try again later");
//     return;
//   }

//   // TODO: Try Separate video upload and thumbnail upload

//   // Clear inputs and Interval
//   data.target.value = "";

//   clearInterval(progessIntervel);
//   setUploadProgress(100);
//   setIsUploading(false);
//   toast.success("Video uploaded successfully");
};
