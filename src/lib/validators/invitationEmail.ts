export interface InvitationEmailType {
    email: string
    invitation_code: string
    workspaceName: string
    workspaceId: string
}

export interface ReviewContentEmailType {
    email: string
    workspaceName: string
    editorName: string
}