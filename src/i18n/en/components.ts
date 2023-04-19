export default {
  address: {
    address: {
      label: 'Address',
      errors: {
        required: 'Address is required',
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
  banner: {
    header: {
      flagImg: {
        alt: 'U.S. flag',
      },
      text: 'This is an official website of {TODO_YOUR_STATE_OR_TERRITORY_HERE}',
      actionText: "Here's how you know",
    },
    content: {
      dotGov: {
        icon: {
          alt: '',
        },
        explanation: {
          title: 'Official websites use .gov',
          text: 'A <strong>.gov</strong> website belongs to an official government organization in the United States.',
        },
      },
      https: {
        icon: {
          alt: '',
        },
        lockIcon: {
          title: 'Lock',
          description: 'A locked padlock',
        },
        explanation: {
          title: 'Secure .gov websites use HTTPS',
          text: "A <strong>lock ( <0>lock</0> )</strong> or <strong>https://</strong> means you've safely connected to the .gov website. Share sensitive information only on official, secure websites.",
        },
      },
    },
  },
  dropdownField: {
    select: '- Select -',
  },
  footer: {
    returnTop: 'Return to top',
    identifierAria: 'Agency identifier',
    official:
      'An official website of <0>{TODO_YOUR_STATE_OR_TERRITORY_HERE}</0>',
    links: 'Important links',
    link1: 'Link 1',
    link2: 'Link 2',
    link3: 'Link 3',
    home: 'Home',
    govAria: 'U.S. government information and services',
    copyright: 'Copyright © 2023 {TODO_YOUR_STATE_OR_TERRITORY_HERE}',
  },
  header: {
    title: 'Unemployment Insurance Benefits',
    navMenu: {
      button: 'Menu',
      items: {
        home: 'Home',
        claim: 'My claim',
        logOut: 'Log out',
      },
    },
  },
  importedInputBox: {
    heading: 'The following information has been added to your application:',
  },
  yesNoQuestion: {
    yes: 'Yes',
    no: 'No',
  },
  dateInput: {
    day: 'Day',
    month: 'Month',
    year: 'Year',
    error: { invalid: 'Date is invalid' },
  },
  phoneNumberField: {
    phone_number: {
      errors: {
        matches: 'Please enter a phone number like (555) 555-1234',
        required: 'Phone number is required',
      },
    },
    sms: {
      label: 'Can we send text messages to this number?',
      help_text: 'Your mobile plan’s message and data rates may apply.',
      errors: {
        required: 'Please say if we can send text messages to this number',
      },
    },
  },
}
