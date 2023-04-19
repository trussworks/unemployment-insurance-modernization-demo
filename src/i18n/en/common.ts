const common = {
  button_text: {
    continue: 'Continue',
    submit: 'Submit',
  },
  date: {
    month: {
      label: 'Month',
    },
    day: {
      label: 'Day',
    },
    year: {
      label: 'Year',
    },
    errors: {
      format:
        '{{ fieldName }} must be a valid date with format {{ dateFormat }}',
      required: '{{ fieldName }} is required',
    },
  },

  address: {
    address: {
      label: 'Address',
      errors: {
        required: 'Address is required',
        pobox:
          'P.O. boxes can only be used as a mailing address, not a residential address. If you do not have another address, then please contact us.',
        maxLength: 'Address must be at most 64 characters',
      },
    },

    address2: { label: 'Address 2 (optional)' },
    city: {
      label: 'City',
      errors: {
        required: 'City is required',
        noNumbers: 'Do not use numbers',
        maxLength: 'City must be at most 64 characters',
      },
    },
    state: {
      label: 'State',
      errors: {
        required: 'State is required',
      },
    },
    zipcode: {
      label: 'ZIP',
      errors: {
        required: 'ZIP Code is required',
        format: 'ZIP Code must be five digits or in 12345-1234 format',
      },
    },
  },
  validation: {
    required: 'This field is required',
  },
}

export default common
