export default {
  claimStatus: {
    header: "We're reviewing your claim",
    success: 'Application submitted',
    certifyButton: 'Certify for benefits',
    review:
      "We are reviewing your application information to make sure you're eligible for benefits payments.",
    certify:
      "You'll need to certify each week starting [17 days from submit date] to receive benefits, and you should receive each payment within a week of certifying. Once you've found a job and are no longer unemployed, please submit one more weekly certification so we can update your account.",
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
