import { z } from "zod";

export interface GetEditorResType {
  editor: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
}

export const inviteEditorSchema = z.object({
  email: z.string().email(),
});

export type InviteEditorType = z.infer<typeof inviteEditorSchema>;
