import { PrimaryActionEmailHtml } from '@/components/emails/InvitationEmail'
import {Resend} from 'resend'
import { InvitationEmailType } from './validators/invitationEmail';

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
          href: `${process.env.NEXT_PUBLIC_URL}/accept-invitation?code=${invitation_code}&workspace=${workspaceId}`
        }),
    });
    console.log(data.data);
    
    return data.data;
}

