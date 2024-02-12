import { useMutation, useQuery } from "@tanstack/react-query";

// this route is only for testing
export const useGetAllWorkspace = () => {
  const query = useMutation({
    mutationFn: async() => {
      const res = await fetch("/api/test");
      console.log(res);
    }
    
  });

  return { ...query};
};

// type error