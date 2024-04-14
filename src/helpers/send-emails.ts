import { PrimaryActionEmailHtml } from '@/components/emails/InvitationEmail'
import {Resend} from 'resend'
import { InvitationEmailType, ReviewContentEmailType } from '../lib/validators/invitationEmail';

const resend = new Resend(process.env.RESEND_API_KEY)
export async function invitationEmail ({email, invitation_code, workspaceName, workspaceId}: InvitationEmailType) {
    console.log("email");
    
    const data = await resend.emails.send({
        from: 'CraftSync <fullstack@ranathedeveloper.site>',
        to: [email],
        subject:
        `Invite you to join ${workspaceName} workspace on CraftSync.`,
        html: PrimaryActionEmailHtml({
          actionLabel: "Accept invitation",
          buttonText: "Join Workspace",
          href: `${process.env.NEXT_PUBLIC_URL}/accept-invitation?code=${invitation_code}&id=${workspaceId}&name=${workspaceName}`,
        }),
    });
    console.log(data.data);
    
    return data.data;
}
export async function reviewEmail ({email, workspaceName, editorName}: ReviewContentEmailType) {
    console.log("review email");
    
    const data = await resend.emails.send({
        from: 'CraftSync <fullstack@ranathedeveloper.site>',
        to: [email],
        subject:
        `${editorName} has invited you to review the content of ${workspaceName} workspace`,
        html: PrimaryActionEmailHtml({
          actionLabel: "Review Content",
          buttonText: "Review Content",
          href: `${process.env.NEXT_PUBLIC_URL}/dashboard/${workspaceName}`,
        }),
    });
    console.log(data.data);

    return data.data;
}



// TODO: create a new email  template for review
