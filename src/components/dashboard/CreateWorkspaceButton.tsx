"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button, buttonVariants } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {zodResolver} from "@hookform/resolvers/zod";
import { CreateWorkspaceType, createWorkspaceSchema } from "@/lib/validators/workspaces";
import toast from "react-hot-toast";

const CreateWorkSpaceButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, resetField } = useForm<CreateWorkspaceType>({
    resolver: zodResolver(createWorkspaceSchema),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: CreateWorkspaceType) => {      
      const res = await fetch("/api/workspace", {
        method: "POST",
        body: JSON.stringify({ title: data.name }),
        headers: {
          "Content-Type": "application/json",
        }
      });

      return res.json();
    },
    
    onSuccess: async(data) => {
      setIsSubmitting(false);
      if (data.status === 409) {
        // logic for workspace already exists error (UI)
        toast.error(data.message);
      }
      else{

        // OR logic for workspace created (UI)
        queryClient.invalidateQueries({queryKey: ["workspaces"]});
        toast.success(data.message);
        setIsOpen(false);
      }
            
    },
    onError: (_, message) => {
      // Internal server error
      setIsSubmitting(false);
      console.log("error", message);
      toast.error("There was an error while creating your workspace, please try again later");
    },
    
  });

  // setup ui for error and success 


  const submit: SubmitHandler<any> = async (data) => {
    setIsSubmitting(true);
    await mutation.mutate({name: data});
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
