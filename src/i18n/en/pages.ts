export default {
  claimStatus: {
    header: "We're reviewing your claim",
    success: 'Application submitted',
    certifyButton: 'Certify for benefits',
    review:
      "We are reviewing your application information to make sure you're eligible for benefits payments.",
    certify:
      "You’ll need to certify each week to continue receiving benefits. Each time you certify, you should receive payment within a week.",
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
        "Do you have a driver's license or government issued ID for {TODO_YOUR_STATE_OR_TERRITORY_HERE}?",
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
  employer: {
    header: 'Employer details',
    your_employer: {
      section_title: 'Your employer',
      employer_name: {
        label: 'Employer name',
        hint: 'You can usually find the employer or business name on your paystub or W2.',
        errors: {
          required: 'You must give the name of your employer',
          maxLength:
            'Please shorten your employer’s name to 64 characters or less (including spaces). For example you may say “DOL” instead of “Department of Labor”, or “Intl” instead of “International”',
        },
      },
      is_full_time: {
        label: 'Was this a full-time or part-time job?',
        options: {
          full_time: 'Full-time',
          part_time: 'Part-time or intermittent',
        },
        errors: {
          required:
            'You must say whether this was a full-time or part-time job',
        },
      },
      employer_address: {
        address: { label: 'Employer street address' },
        address2: { label: 'Employer street address 2 (optional)' },
        city: { label: 'City' },
        state: { label: 'State' },
        zipcode: { label: 'ZIP' },
      },
      employer_phone: {
        label: 'Employer phone number',
      },
      is_employer_phone_accurate: {
        label:
          'Is the phone number of your physical workplace the same as the number entered above?',
        errors: {
          required: "Please check that the employer's phone number is right",
        },
      },
      work_location_phone: {
        label: 'Work location phone number (optional)',
      },
    },
    business_interests: {
      section_title: 'Your business interests',
      self_employed: {
        label: 'Were you self employed at this business?',
        errors: {
          required:
            'You must say whether you are self-employed at this business',
        },
      },
      is_owner: {
        label:
          'Were you, or are you now, the owner or part-owner of this business?',
        errors: {
          required:
            'You must say whether you have/had ownership in this business',
        },
      },
    },
    separation: {
      section_title: 'Change in employment',
      reason: {
        label: 'Why did your job end or your hours change?',
        errors: {
          required: 'Change in employment reason is required',
        },
        options: {
          laid_off: {
            label: 'Laid off',
            description:
              'Your job ended due to your work location closing or moving, lack of work, downsizing, reorganization, or your contract ending.',
          },
          fired_discharged_suspended: {
            label: 'Fired, discharged, or suspended',
            description:
              'This employer ended your job, suspended you, or forced you to resign for a reason other than lack of work or assignment ending.',
          },
          still_employed: {
            label: 'Still employed',
            description:
              "You're still working for this employer, but you may have fewer hours or be on a leave/break.",
          },
          quit_or_retired: {
            label: 'Quit, resigned, or retired',
            description:
              'You left your job entirely by your own decision (this does not include forced resignation)',
          },
          strike_or_lock_out_by_employer: {
            label: 'Strike or lock out by employer',
            description:
              'During a labor dispute, you chose to stop work or this employer stopped work.',
          },
          unsatisfactory_work_performance: {
            label: 'Unsatisfactory work performance',
            description:
              'This employer ended your job due to performance, such as not meeting a quota',
          },
          federal_or_state_shutdown: {
            label: 'Strike or lock out by employer',
            description:
              'During a labor dispute, you decided to stop work or this employer stopped work.',
          },
        },
      },
      employment_start_date: {
        label: 'Start date for this employer',
        errors: {
          required: 'Start date is required',
          maxDate: "Start date can't be in the future",
        },
      },
      employment_last_date: {
        label: 'Last day of work for this employer',
        errors: {
          required: 'Last day of work is required',
          minDate: "Last day can't be before employment start date",
        },
      },
    },
  },
}
