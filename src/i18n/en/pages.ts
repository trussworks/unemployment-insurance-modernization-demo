export default {
  ssn: {
    heading: 'Access your records',
    questions: {
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
    },
    showSsn: 'Show number',
    hideSsn: 'Hide number',
    continue: 'Continue',
  },
  identity: {
    heading: 'Identity Information',
    questions: {
      dateOfBirth: { label: 'Date of birth', errors: {} },
      ssn: { label: 'Social security number', errors: {} },
      hasDriversLicenseOrStateId: {
        label:
          "Do you have a {TODO_YOUR_STATE_OR_TERRITORY_HERE} driver's license or state ID?",
        errors: {},
      },
      driversLicenseOrStateIdNumber: {
        label: "Driver's license or state ID number",
        errors: {},
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
        errors: {},
      },
      immigrationDocumentFirstName: {
        label: 'First name',
        errors: {},
      },
      immigrationDocumentMiddleInitial: {
        label: 'Middle initial',
        errors: {},
      },
      immigrationDocumentLastName: {
        label: 'Last name',
        errors: {},
      },
      hasUscisOrAlienRegistrationNumber: {
        label: 'Do you have a USCIS / Alien registration number?',
        hint: '<0>Need help finding it?</0> This is a 7-9 digit number, sometimes starting with “A”',
      },
      uscisOrAlienRegistrationNumber: {
        label: 'USCIS / Alien registration number',
        errors: {},
      },
      confirmUscisOrAlienRegistrationNumber: {
        label: 'Re-enter USCIS / Alien registration number',
        errors: {},
      },
      countryOfOrigin: {
        label: 'Country of origin',
        errors: {},
      },
      immigrationDocumentIssueDate: {
        label: 'Valid from / issued on',
        errors: {},
      },
      immigrationDocumentExpirationDate: {
        label: 'Expiration date',
        errors: {},
      },
    },
    immigrationDocumentSectionTitle:
      'Enter the following information as it appears on your immigration documents',
    immigrationHelpModal: {
      heading:
        'You are navigating to immigrationhelp.org, a website not managed by {TODO YOUR STATE OR TERRITORY HERE}',
      continue: 'Continue',
      cancel: 'Cancel',
    },
  },
}
