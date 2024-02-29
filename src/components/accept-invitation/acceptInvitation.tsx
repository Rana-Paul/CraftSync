"use client";
import { signIn } from 'next-auth/react';
import { FC } from 'react'

interface acceptInvitationProps {
  workspaceName: string
  workspaceId: string
  code: string
}

export const AcceptInvitation: FC<acceptInvitationProps> = ({workspaceName, workspaceId, code}: acceptInvitationProps) => {
  console.log("hiiii");
  
  console.log("code: ", code, "workspaceId: ", workspaceId, "workspaceName: ", workspaceName);
  
  
  return (
    <div>
      <button onClick={() => signIn('google', {callbackUrl: `${process.env.NEXT_PUBLIC_URL}/accept-invitation?code=${code}&id=${workspaceId}&name=${workspaceName}`})}>Here Button</button>
    </div>
  )
}

