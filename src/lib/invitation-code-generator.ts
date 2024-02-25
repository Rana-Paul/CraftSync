import referralCodes from 'referral-codes';



export const getReferralCode = () => {
    const referralCode = referralCodes.generate({
        length: 8,
        count: 1,
    });
    return referralCode[0];
}

