import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name should be at least 2 characters" })
    .max(50, { message: "Name should be at most 50 characters" }),
});

export type CreateWorkspaceType = z.infer<typeof createWorkspaceSchema>;

export interface WorkspaceType {
  id: string;
  title: string;
  creatorId: string;
  createdAt: Date;
  editors: string[];
}