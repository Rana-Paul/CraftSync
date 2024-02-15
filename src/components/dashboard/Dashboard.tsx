"use client";

import { GhostIcon, Loader2, Plus, Trash } from "lucide-react";
import { FC, useCallback, useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { Button } from "../ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import CreateWorkSpaceButton from "./CreateWorkspaceButton";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<
    null | string
  >(null);

  const { data: session } = useSession();

  // start from here (button to create workspace):
  // 1) create proper endpoint to create workspace
  // 2) configure dashboard to create workspace\

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/workspace", {
        method: "GET",
      });
      return res.json();
    },
  });
  const {data: workspaces, isLoading, isError} = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const res = await fetch("/api/workspace", {
        method: "GET",
      });
      return res.json();
    },
  })
  console.log(workspaces?.workspace);
  
  

  const projects = [
    {
      id: "1",
      name: "My Workspace 1",
      createdAt: Date.now(),
    },
    {
      id: "2",
      name: "My Workspace 2",
      createdAt: Date.now(),
    },
    {
      id: "3",
      name: "My Workspace 3",
      createdAt: Date.now(),
    },
  ];
  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col ml-4 items-start justify-between gap-4 border-b border-gray-200 pb-5 md:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-4xl md:text-5xl text-gray-900">
          My Workspaces
        </h1>

        <CreateWorkSpaceButton /> 
      </div>

      {/* Display all file */}
      {workspaces?.workspace && workspaces.workspace.length !== 0 ? (
        <ul className=" mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-3 lg:grid-cols-3 ">
          {workspaces.workspace.sort((a: any, b: any) => b.createdAt - a.createdAt)
          .map((data: any, index: number) => (
              <li
                className=" col-span-1 divide-y divide-gray-200 border-t-2 border-gray-300/50 rounded-lg bg-white shadow transition hover:shadow-lg"
                key={index}
              >
                <Link
                  className="flex flex-col gap-2"
                  href={`/dashboard/${data.id}`}
                >
                  <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className=" truncate text-lg font-medium text-zinc-900">
                          {data.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="px-6 mt-4 grid grid-cols-2 place-items-center py-2 gap-6 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {format(new Date(data.createdAt), "MMM yyyy")}
                  </div>

                  <Button
                    onClick={() => {}}
                    size="sm"
                    className="w-full"
                    variant="destructive"
                  >
                    {currentlyDeletingFile === data.id ? (
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
