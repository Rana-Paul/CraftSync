import { FC } from "react";
import { Menu } from "lucide-react";

interface CommentSection {}

const CommentSection: FC<CommentSection> = ({}) => {
  //TODO:  use vaul ui package for sidebar

  return (
    <div className="w-full h-screen">
      <div className="h-[80%] text-xl m-4 shadow-sm shadow-gray-500 rounded-md border-gray-100 p-4">
        <h1 className="text-2xl text-gray-600 text-center">Add Comments for Editors</h1>
        <div>
          
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
