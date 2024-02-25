import invitationCodeGenerator from 'referral-codes';



export const getInvitationCode = () => {
    const invitationCode = invitationCodeGenerator.generate({
        length: 8,
        count: 1,
    });
    return invitationCode[0];
}

