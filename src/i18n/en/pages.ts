export default {
  claim: {
    header: "We're reviewing your claim",
    success: 'Application submitted',
    certifyButton: 'Certify for benefits',
    review:
      "We are reviewing your application information to make sure you're eligible for benefits payments.",
    email:
      "In the meantime, you should receive an email for identity verification from ID.me. Do not certify for benefits online or by phone while waiting for this email, or it will delay your payments. If you don't receive an email or call from us by [15 days from now], please <0>contact us</0>.",
    potentialBenefits: {
      header: 'Potential benefits remaining',
      context: '(<0></0> paid so far)',
    },
    potentialNextPayment: {
      header: 'Potential next payment',
    },
    claimPeriod: {
      header: 'Claim period',
    },
    accountUpdate: {
      submission: 'Submitted as #<0></0>',
    },
  },
  ssn: {
    header: 'Access your records',
    label: 'Social security number',
    showSsn: 'Show number',
    hideSsn: 'Hide number',
    continue: 'Continue',
    errors: {
      badFormat:
        'Social Security number must be exactly 9 numbers with format 000-00-0000',
      invalid: 'This Social Security number is invalid, please check your card',
      required: 'Social Security number is required',
    },
  },
}
