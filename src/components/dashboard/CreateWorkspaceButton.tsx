"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button, buttonVariants } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {zodResolver} from "@hookform/resolvers/zod";
import { CreateWorkspaceType, createWorkspaceSchema } from "@/lib/validators/workspaces";

const CreateWorkSpaceButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, resetField } = useForm<CreateWorkspaceType>({
    resolver: zodResolver(createWorkspaceSchema),
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/test", {
        method: "GET",
      });
      console.log(res);
      
      return res.json();
    },
    
  });


  const submit: SubmitHandler<any> = async (data) => {
    await mutation.mutate();
    console.log(data);
  }
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(x) => {
        if (!x) setIsOpen(x);
        resetField("name");
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button>Create Workspace</Button>
      </DialogTrigger>

      <DialogContent>
        <form className="w-full mt-2" onSubmit={handleSubmit(submit)}>
          <h2 className="text-xl font-semibold">Create Workspace</h2>
          <input
            type="text"
            className="w-full mt-2 rounded-sm"
            placeholder="Enter Your Workspace Name"
            {...register("name", { required: "Name is required" })}
          />
          <div className="h-3">

          {errors.name?.message && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
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
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkSpaceButton;
