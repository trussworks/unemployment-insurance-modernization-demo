export default {
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
  employer: {
    header: 'Employer details',
    continue: 'Continue',
    your_employer: {
      employer_name: {
        label: 'Employer name',
        hint: 'You can usually find the employer or business name on your paystub or W2.',
        errors: {
          required: 'You must give the name of your employer',
          maxLength:
            'Please shorten your employer’s name to 40 characters or less (including spaces). For example you may say “DOL” instead of “Department of Labor”, or “Intl” instead of “International”',
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
        address: { label: 'Employer street address 1' },
        address2: { label: 'Employer street address 2 (optional)' },
        address3: { label: 'Employer street address 3 (optional)' },
        city: { label: 'City' },
        state: { label: 'State' },
        zipcode: { label: 'ZIP' },
      },
    },
  },
}
