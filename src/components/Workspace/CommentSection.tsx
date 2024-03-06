import { FC } from "react";
import { Menu } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface CommentSection {}

const CommentSection: FC<CommentSection> = ({}) => {
  //TODO:  use vaul ui package for sidebar

  return (
    <div className="h-screen">
      <div className="h-[80%] flex flex-col justify-between text-xl m-4 shadow-sm shadow-gray-500 rounded-md border-gray-100 p-4">
        <div className="">
          {/* Heading*/}
          <p className="px-2 text-xl text-center text-gray-500">
            Add Comments for Editors{" "}
          </p>

          {/* Comment Div*/}
          <div>Comments</div>
        </div>

        {/* Input box */}
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="email" placeholder="Add comment" />
          <Button type="submit">Add</Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
