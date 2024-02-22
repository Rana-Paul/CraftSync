import { FC } from "react";
import { Button, buttonVariants } from "../ui/button";
import { Share2 } from "lucide-react";

interface InviteEditorButtonProps {}

const InviteEditorButton: FC<InviteEditorButtonProps> = ({}) => {
  return (
    <Button
      onClick={() => {
        console.log("hui");
      }}
      className={buttonVariants({
        size: "sm",
      })}
    >
      <Share2 className="mr-2 h-5 w-5" />
      Invite Editor
    </Button>
  );
};

export default InviteEditorButton;
