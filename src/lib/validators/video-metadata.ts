import { z } from "zod";

export const videoMetadataSchema = z.object({
  title: z
    .string()
    .max(70, { message: "Title should be at most 70 characters" }),
  description: z
    .string()
    .max(5000, { message: "Description should be at most 500 characters" }),
  status: z.string(),
});

export type VideoMetaDataType = z.infer<typeof videoMetadataSchema>;
