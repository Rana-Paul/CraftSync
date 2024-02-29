import { AcceptInvitation } from "@/components/accept-invitation/AcceptInvitation";
import { FC } from "react";

interface pageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

const page: FC<pageProps> = ({ searchParams }: pageProps) => {
  const code = searchParams.code;
  const id = searchParams.id;
  const name = searchParams.name;
  console.log("code: ", code, "id: ", id);

  return (
    <div>
      <AcceptInvitation
        workspaceName={name as string}
        workspaceId={id as string}
        code={code as string}
      />
    </div>
  );
};

export default page;
