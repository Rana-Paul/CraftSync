"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button, buttonVariants } from "../ui/button";

const CreateWorkSpaceButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(x) => {
        if (!x) setIsOpen(x);
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button>Create Workspace</Button>
      </DialogTrigger>

      <DialogContent>
        <div className="w-full mt-2">
          <h2 className="text-xl font-semibold">Create Workspace</h2>
          <input type="text" className="w-full mt-2 rounded-sm" />
          <div className=" border-red-700">
          <Button
            className={buttonVariants({
              size: "sm",
              className: "mt-3",
              variant: "default",
            })}
            onClick={() => setIsOpen(false)}
          >
            Create
          </Button>
          </div>
          
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkSpaceButton;
