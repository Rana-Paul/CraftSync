import { z } from "zod";

export interface GetEditorResType {
  editor: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
}
