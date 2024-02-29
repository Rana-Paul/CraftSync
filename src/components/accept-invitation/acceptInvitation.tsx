"use client";
import { FC } from 'react'

interface acceptInvitationProps {
  workspaceName: string
  workspaceId: string
  code: string
}

const acceptInvitation: FC<acceptInvitationProps> = ({workspaceName, workspaceId, code}: acceptInvitationProps) => {
  return <div>accept-invitation</div>
}

export default acceptInvitation