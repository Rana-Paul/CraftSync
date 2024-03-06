"use client";
import { FC } from "react";
import { Menu } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface CommentSection {}

const CommentSection: FC<CommentSection> = ({}) => {
  //TODO:  use vaul ui package for sidebar

  const comments = [
    {
      name: "Rana Paul",
      Comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat iure eos aspernatur?",
    },
    {
      name: "Jani Sen",
      Comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat iure eos aspernatur?",
    },
    {
      name: "Jani Sen",
      Comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat iure eos aspernatur?",
    },
    {
      name: "Jani Sen",
      Comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat iure eos aspernatur?",
    },
    {
      name: "Jani Sen",
      Comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat iure eos aspernatur?",
    },
    {
      name: "Jani Sen",
      Comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat iure eos aspernatur?",
    },
    {
      name: "Jani Sen",
      Comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat iure eos aspernatur?",
    },
    {
      name: "Jani Sen",
      Comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat iure eos aspernatur?",
    },
  ];

  return (
    <div className="h-screen">
      <div className="h-[80%] flex flex-col justify-between text-xl m-4 shadow-sm shadow-gray-500 rounded-md border-gray-100 p-4">
        <div className="h-[90%]">
          {/* Heading*/}
          <p className="px-2 text-xl text-center text-gray-500">
            Add Comments for Editors{" "}
          </p>

          {/* Comment Div*/}
          <div className="mt-3 h-[95%] overflow-scroll no-scrollbar">
            {/* impliment the map */}
            {comments.map((data: any, index: number) => (
              <div className="w-full text-sm mt-3 mb-2 shadow-sm shadow-gray-400 p-2 rounded-md">
                <span className="text-blue-500">{data.name}:</span>{" "}
                <span className="text-black">{data.Comment}</span>
              </div>
            ))}
          </div>
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
