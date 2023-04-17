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
    your_employer: {
      section_title: 'Your employer',
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
        address: { label: 'Employer street address' },
        address2: { label: 'Employer street address 2 (optional)' },
        address3: { label: 'Employer street address 3 (optional)' },
        city: { label: 'City' },
        state: { label: 'State' },
        zipcode: { label: 'ZIP' },
      },
      employer_phone: {
        label: 'Employer phone number',
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
      heading: 'Change in employment',
      info_alert: {
        description:
          'If you were treated unfairly, harassed, or discriminated against on the job, please also visit the <0>EEOC website</0> for help.',
        website: 'https://www.eeoc.gov/youth/filing-complaint',
      },
      reason: {
        label: 'Why did your job end or your hours change?',
        required: 'Change in employment reason is required',
      },
      option: {
        required: 'Please select a separation option',
      },
      separation_circumstance_details: {
        required_label: 'Please share more details below',
        optional_label: 'Please share more details below <i>(optional)</i>',
        errors: {
          max_length:
            'Your separation circumstance details must be at most 255 characters',
          required: 'More detail about the separation reason is required',
        },
      },
      expect_to_be_recalled: {
        label: 'Do you expect to be recalled by this employer?',
        errors: {
          required: 'You must say whether you expect to be recalled',
        },
      },
      definite_recall: {
        label: 'Do you have a definite date of recall?',
        errors: {
          required: 'You must say whether you have a definite date of recall',
          minDate: 'The date of recall must be after you last day of work',
        },
      },
      definite_recall_date: {
        label: 'Definite date of recall',
        errors: {
          required: 'You must provide the definite recall date',
          minDate: 'Recall date must be after last day of employment',
        },
      },
      is_seasonal_work: {
        label: 'Is your work seasonal?',
        errors: {
          required: 'You must say whether your work was seasonal',
        },
      },
      reasons: {
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
  },
}
