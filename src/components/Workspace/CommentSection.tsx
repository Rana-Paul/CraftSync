import { FC } from "react";
import { Menu } from "lucide-react";

interface CommentSection {}

const CommentSection: FC<CommentSection> = ({}) => {
  //TODO:  use vaul ui package for sidebar

 return (
    <div className="w-full">

      <div className=" my-4 border-b border-gray-100 pb-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Dashboard
                </h3>
              </div>
            </div>
        

        
    </div>
  );
};

export default CommentSection;
