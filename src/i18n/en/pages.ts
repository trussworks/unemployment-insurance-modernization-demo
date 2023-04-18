export default {
  ssn: {
    heading: 'Access your records',
    ssn: {
      label: 'Social security number',
      errors: {
        badFormat:
          'Social Security number must be exactly 9 numbers with format 000-00-0000',
        invalid:
          'This Social Security number is invalid, please check your card',
        required: 'Social Security number is required',
      },
    },
    showSsn: 'Show number',
    hideSsn: 'Hide number',
    continue: 'Continue',
  },
  identity: {
    heading: 'Identity Information',
    dateOfBirth: {
      label: 'Date of birth',
      errors: { required: 'You must enter your date of birth' },
    },
    ssn: {
      label: 'Social security number',
    },
    hasDriversLicenseOrStateId: {
      label:
        "Do you have a {TODO_YOUR_STATE_OR_TERRITORY_HERE} driver's license or state ID?",
      errors: {
        required:
          "You must answer whether you have a driver's license or state ID",
      },
    },
    driversLicenseOrStateIdNumber: {
      label: "Driver's license or state ID number",
      errors: {
        required: "You must provide your driver's license or state ID number",
      },
    },
    workAuthorizationType: {
      label: 'Are you legally allowed to work in the United States?',
      options: {
        usCitizenOrNational: 'Yes; I am a U.S. citizen/national',
        permanentResident: 'Yes; I am a permanent resident',
        h1bVisa: 'Yes; I have an H1B visa',
        employmentAuthorizationDocument:
          'Yes; I have an employment authorization card/document',
        notLegallyAllowedToWorkInUS:
          'No; I am not legally allowed to work in the United States',
      },
      errors: {
        required: 'You must select a work authorization',
      },
    },
    immigrationDocumentFirstName: {
      label: 'First name',
      errors: {
        required: 'First name is required',
      },
    },
    immigrationDocumentMiddleInitial: {
      label: 'Middle initial',
      errors: {
        required: 'Middle initial is required',
      },
    },
    immigrationDocumentLastName: {
      label: 'Last name',
      errors: {
        required: 'Last name is required',
      },
    },
    hasUscisOrAlienRegistrationNumber: {
      label: 'Do you have a USCIS / Alien registration number?',
      hint: '<0>Need help finding it?</0> This is a 7-9 digit number, sometimes starting with “A”',
      errors: {
        required:
          'You must answer whether you have a USCIS or alien registration number',
      },
    },
    uscisOrAlienRegistrationNumber: {
      label: 'USCIS / Alien registration number',
      errors: {
        required: 'You must enter your USCIS / Alien registration number',
      },
    },
    confirmUscisOrAlienRegistrationNumber: {
      label: 'Re-enter USCIS / Alien registration number',
      errors: {
        required: 'You must re-enter your USCIS / Alien registration number',
      },
    },
    countryOfOrigin: {
      label: 'Country of origin',
      errors: {
        required: 'You must provide your country of origin',
      },
    },
    immigrationDocumentIssueDate: {
      label: 'Valid from / issued on',
      errors: {
        required: 'You must enter the date your document was issues on',
      },
    },
    immigrationDocumentExpirationDate: {
      label: 'Expiration date',
      errors: {
        required: 'You must enter the date your document expires/expired',
      },
    },
    immigrationDocumentSectionHeading:
      'Enter the following information as it appears on your immigration documents',
    immigrationHelpModal: {
      heading:
        'You are navigating to immigrationhelp.org, a website not managed by {TODO YOUR STATE OR TERRITORY HERE}',
      continue: 'Continue',
      cancel: 'Cancel',
    },
  },
}
