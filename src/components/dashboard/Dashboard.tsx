"use client";

import { GhostIcon, Loader2, Plus, Trash } from "lucide-react";
import { FC, useState } from "react";
import UploadButton from "../UploadButton";
import { format } from "date-fns";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<
    null | string
  >(null);

  // Testing Query client
  const {data, error, isLoading} = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch("https://catfact.ninja/fact");
      return res.json();
    },
  })

  if(isLoading) {
    console.log("loading...");
    
  }

  if (data) {
    console.log("Data: ", data);
    
  }

  
  


  // const isLoading = false;
  const projects = [
    {
      id: "1",
      name: "My Workspace 1",
      createdAt: Date.now(),
    },
    {
      id: "2",
      name: "My Workspace 2",
      createdAt:  Date.now(),
    },
    {
      id: "3",
      name: "My Workspace 3",
      createdAt:  Date.now(),
    },
  ];
  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col ml-4 items-start justify-between gap-4 border-b border-gray-200 pb-5 md:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-4xl md:text-5xl text-gray-900">
          My Workspaces
        </h1>

        <UploadButton />
      </div>

      {/* Display all file */}
      {projects && projects.length !== 0 ? (
        <ul className=" mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-3 lg:grid-cols-3 ">
          {projects
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((file) => (
              <li
                className=" col-span-1 divide-y divide-gray-200 border-t-2 border-gray-300/50 rounded-lg bg-white shadow transition hover:shadow-lg"
                key={file.id}
              >
                <Link
                  className="flex flex-col gap-2"
                  href={`/dashboard/${file.id}`}
                >
                  <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className=" truncate text-lg font-medium text-zinc-900">
                          {file.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="px-6 mt-4 grid grid-cols-2 place-items-center py-2 gap-6 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {format(new Date(file.createdAt), "MMM yyyy")}
                  </div>

                  <Button
                    onClick={() => {}}
                    size="sm"
                    className="w-full"
                    variant="destructive"
                  >
                    {currentlyDeletingFile === file.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <Skeleton height={100} className="my-2" count={3} />
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <GhostIcon className="h-8 w-8 text-zinc-800" />
          <h3 className=" font-semibold text-xl">Pretty empty around here</h3>
          <p>Let&apos;s create a Workspace.</p>
        </div>
      )}
    </main>
  );
};
export default Dashboard;
