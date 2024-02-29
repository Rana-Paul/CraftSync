"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button, buttonVariants } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { inviteEditorSchema, InviteEditorType } from "@/lib/validators/editor";
import toast from "react-hot-toast";

const InviteEditorButton = ({ workspaceId }: { workspaceId: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<InviteEditorType>({
    resolver: zodResolver(inviteEditorSchema),
  });

  const queryClient = useQueryClient();

  // Mutation logic 
  const mutation = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      console.log("email", email);

      const res = await fetch("/api/editors", {
        method: "POST",
        body: JSON.stringify({ email: email, workspaceId: workspaceId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.json();
    },
    // Success logic
    onSuccess: async (data) => {
      setIsSubmitting(false);
      if (data.status === 401) {
        toast.error(data.message);
      } else {
        queryClient.invalidateQueries({ queryKey: ["editors"] });
        toast.success(data.message);
        setIsOpen(false);
      }
    },
    // Error logic
    onError: (_, message) => {
      // Internal server error
      setIsSubmitting(false);
      console.log("error", message);
      toast.error(
        "There was an error while iniviting your editor, please try again later"
      );
    },
  });

  const submit: SubmitHandler<any> = async (data: InviteEditorType) => {
    setIsSubmitting(true);
    console.log(data);
    await mutation.mutate({ email: data.email });
    setIsSubmitting(false);
  };
  
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(x) => {
        if (!x) setIsOpen(x);
        resetField("email");
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button className={buttonVariants({ variant: "default", size: "sm" })}>Invite Editor</Button>
      </DialogTrigger>

      <DialogContent>
        <form className="w-full mt-2" onSubmit={handleSubmit(submit)}>
          <h2 className="text-xl font-semibold">Invite Editor</h2>
          <input
            type="text"
            className="w-full mt-2 rounded-sm"
            placeholder="Enter editor email name"
            {...register("email", { required: "Name is required" })}
          />
          <div className="h-3">
            {errors.email?.message && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <Button
            className={buttonVariants({
              size: "sm",
              className: "mt-3",
              variant: "default",
            })}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Inviting..." : "Invite"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteEditorButton;
