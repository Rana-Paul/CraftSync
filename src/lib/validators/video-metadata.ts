import { z } from "zod";
import { VideoStatus } from "./videostatus";

export const videoMetadataSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title should be at least 1 characters" })
    .max(70, { message: "Title should be at most 70 characters" }),
  description: z
    .string()
    .max(5000, { message: "Description should be at most 500 characters" }),
  status: z.enum([VideoStatus.PUBLIC, VideoStatus.PRIVATE]),
});

export type VideoMetaDataType = z.infer<typeof videoMetadataSchema>;
