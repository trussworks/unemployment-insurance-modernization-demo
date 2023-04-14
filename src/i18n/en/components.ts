export default {
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
    address3: { label: 'Address 3 (optional)' },
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
  yesNoQuestion: {
    yes: 'Yes',
    no: 'No',
  },
}
