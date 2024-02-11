"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";


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
        <input type="text" />
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkSpaceButton;
