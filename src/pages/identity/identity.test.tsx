import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Identity } from './identity'

const HEADER_TEXT = 'Identity Information'
const IMPORTED_HEADER_TEXT =
  'The following information has been added to your application:'
const SSN_LABEL = 'Social security number'
const DL_RADIO_NAME =
  "Do you have a driver's license or government issued ID for {TODO_YOUR_STATE_OR_TERRITORY_HERE}?"
const DL_LABEL = "Driver's license or state ID number"
const WORK_NAME = 'Are you legally allowed to work in the United States?'
const WORK_YES_US_NATIONAL = 'Yes; I am a U.S. citizen/national'
const WORK_YES_PERMANENT_RESIDENT = 'Yes; I am a permanent resident'
const IMMIGRATION_HEADING =
  'Enter the following information as it appears on your immigration documents'
const USCIS_NUMBER_NAME = 'Do you have a USCIS / Alien registration number?'
const USCIS_REQUIRED =
  'You must answer whether you have a USCIS or alien registration number'
const USCIS_TEXT_LABEL = 'USCIS / Alien registration number'
const USCIS_NUM_REQUIRED =
  'You must enter your USCIS / Alien registration number'
const USCIS_NUM_RE_ENTER_REQUIRED =
  'You must re-enter your USCIS / Alien registration number'
const RE_ENTER_USCIS_TEXT_LABEL = 'Re-enter USCIS / Alien registration number'

const COUNTRY_OF_ORIGIN = 'Country of origin'
const COUNTRY_OF_ORIGIN_REQUIRED = 'You must provide your country of origin'
const MODAL_HEADER =
  'You are navigating to immigrationhelp.org, a website not managed by {TODO YOUR STATE OR TERRITORY HERE}'
const SSN_REQUIRED_MESSAGE = 'Social Security number is required'
const DL_REQUIRED_MESSAGE =
  "You must answer whether you have a driver's license or state ID"

const DL_NUMBER_REQUIRED_MESSAGE =
  "You must provide your driver's license or state ID number"
const WORK_REQUIRED_MESSAGE = 'You must select a work authorization'

type identityPageProps = {
  importedSsn?: string
  importedDateOfBirth?: string
}

describe('Identity page', () => {
  const renderIdentityPage = (props: identityPageProps) => {
    render(<Identity {...props} />)

    const header = screen.getByText(HEADER_TEXT)
    const queryForImportedHeader = () =>
      screen.queryByText(IMPORTED_HEADER_TEXT)
    const queryForSSNInput = () => screen.queryByLabelText(SSN_LABEL)
    const driversLicenseRadio = screen.getByRole('group', {
      name: DL_RADIO_NAME,
    })
    const yesDLRadio = within(driversLicenseRadio).getByLabelText('Yes')
    const noDLRadio = within(driversLicenseRadio).getByLabelText('No')

    const queryForDLInput = () => screen.queryByLabelText(DL_LABEL)

    const workAuthorizationRadio = screen.getByRole('group', {
      name: WORK_NAME,
    })
    const yesUSNationalRadio = within(workAuthorizationRadio).getByLabelText(
      WORK_YES_US_NATIONAL
    )
    const yesPermanentResidentRadio = within(
      workAuthorizationRadio
    ).getByLabelText(WORK_YES_PERMANENT_RESIDENT)

    const queryForImmigrationHeading = () =>
      screen.queryByText(IMMIGRATION_HEADING)

    const queryFirstName = () => screen.queryByLabelText('First name')
    const queryMiddleInitial = () => screen.queryByLabelText('Middle initial')
    const queryLastName = () => screen.queryByLabelText('Last name')

    const queryUSCISNumber = () =>
      screen.queryByRole('group', {
        name: USCIS_NUMBER_NAME,
      })

    const queryUSCISTextInput = () =>
      screen.queryByRole('textbox', {
        name: USCIS_TEXT_LABEL,
      })
    const queryReEnterUSCISTextInput = () =>
      screen.queryByRole('textbox', {
        name: RE_ENTER_USCIS_TEXT_LABEL,
      })

    const queryCountryOfOrigin = () =>
      screen.queryByLabelText(COUNTRY_OF_ORIGIN)

    const queryModalHeading = () => screen.queryByText(MODAL_HEADER)
    const queryContinueButton = () =>
      screen.queryByRole('button', { name: 'Continue' })
    const nextButton = screen.getByRole('button', { name: 'Next' })
    const queryForErrorMessage = (message: string) =>
      screen.queryByText(message)

    return {
      header,
      queryForImportedHeader,
      queryForSSNInput,
      driversLicenseRadio,
      yesDLRadio,
      noDLRadio,
      queryForDLInput,
      workAuthorizationRadio,
      yesUSNationalRadio,
      yesPermanentResidentRadio,
      queryForImmigrationHeading,
      queryFirstName,
      queryMiddleInitial,
      queryLastName,
      queryUSCISNumber,
      queryUSCISTextInput,
      queryReEnterUSCISTextInput,
      queryCountryOfOrigin,
      queryModalHeading,
      queryContinueButton,
      nextButton,
      queryForErrorMessage,
    }
  }

  it('Renders without error with no imported fields', () => {
    const {
      header,
      queryForImportedHeader,
      queryForSSNInput,
      driversLicenseRadio,
      workAuthorizationRadio,
    } = renderIdentityPage({})

    expect(header).toBeInTheDocument()
    expect(queryForImportedHeader()).not.toBeInTheDocument()
    expect(queryForSSNInput()).toBeInTheDocument()
    expect(driversLicenseRadio).toBeInTheDocument()
    expect(workAuthorizationRadio).toBeInTheDocument()
  })

  it('Renders without error with imported fields', () => {
    const {
      header,
      queryForImportedHeader,
      queryForSSNInput,
      driversLicenseRadio,
      workAuthorizationRadio,
    } = renderIdentityPage({
      importedSsn: '123-45-6789',
      importedDateOfBirth: '1/2/2003',
    })
    expect(header).toBeInTheDocument()
    expect(queryForImportedHeader()).toBeInTheDocument()
    expect(queryForSSNInput()).not.toBeInTheDocument()
    expect(driversLicenseRadio).toBeInTheDocument()
    expect(workAuthorizationRadio).toBeInTheDocument()
  })

  it("Shows driver's license or state ID field if user selects yes for the radio", async () => {
    const user = userEvent.setup()

    const { queryForDLInput, yesDLRadio, noDLRadio } = renderIdentityPage({})

    expect(yesDLRadio).not.toBeChecked()
    expect(noDLRadio).not.toBeChecked()
    expect(queryForDLInput()).not.toBeInTheDocument()

    await act(() => user.click(noDLRadio))

    expect(noDLRadio).toBeChecked()
    expect(queryForDLInput()).not.toBeInTheDocument()

    await act(() => user.click(yesDLRadio))

    expect(yesDLRadio).toBeChecked()
    expect(queryForDLInput()).toBeInTheDocument()
  })

  it('Shows immigration document fields if user does not select Yes; I am a U.S. citizen/national', async () => {
    const user = userEvent.setup()

    const {
      yesUSNationalRadio,
      yesPermanentResidentRadio,
      queryForImmigrationHeading,
      queryFirstName,
      queryLastName,
      queryMiddleInitial,
      queryUSCISNumber,
      queryCountryOfOrigin,
    } = renderIdentityPage({})

    expect(yesUSNationalRadio).not.toBeChecked()

    await act(() => user.click(yesUSNationalRadio))

    expect(queryForImmigrationHeading()).not.toBeInTheDocument()
    expect(queryFirstName()).not.toBeInTheDocument()
    expect(queryMiddleInitial()).not.toBeInTheDocument()
    expect(queryLastName()).not.toBeInTheDocument()

    expect(queryUSCISNumber()).not.toBeInTheDocument()
    expect(queryCountryOfOrigin()).not.toBeInTheDocument()

    await act(() => user.click(yesPermanentResidentRadio))
    expect(queryForImmigrationHeading()).toBeInTheDocument()

    expect(queryFirstName()).toBeInTheDocument()
    expect(queryMiddleInitial()).toBeInTheDocument()
    expect(queryLastName()).toBeInTheDocument()

    expect(queryUSCISNumber()).toBeInTheDocument()
    expect(queryCountryOfOrigin()).toBeInTheDocument()
  })

  it('Shows USCIS fields if user selects yes', async () => {
    const user = userEvent.setup()

    const {
      yesPermanentResidentRadio,
      queryUSCISNumber,
      queryUSCISTextInput,
      queryReEnterUSCISTextInput,
    } = renderIdentityPage({})

    await act(() => user.click(yesPermanentResidentRadio))

    expect(queryUSCISNumber()).toBeInTheDocument()
    expect(queryUSCISTextInput()).not.toBeInTheDocument()
    expect(queryReEnterUSCISTextInput()).not.toBeInTheDocument()

    const yesRadio = within(
      screen.getByRole('group', { name: USCIS_NUMBER_NAME })
    ).getByLabelText('Yes')
    expect(yesRadio).toBeInTheDocument()

    await act(() => user.click(yesRadio))

    expect(queryUSCISTextInput()).toBeInTheDocument()
    expect(queryReEnterUSCISTextInput()).toBeInTheDocument()

    const numberInput = screen.getByRole('textbox', {
      name: USCIS_TEXT_LABEL,
    })
    const reEnterNumberInput = screen.getByRole('textbox', {
      name: RE_ENTER_USCIS_TEXT_LABEL,
    })

    await act(() => user.type(numberInput, '1111111'))
    await act(() => user.type(reEnterNumberInput, '1111111'))

    const USCISNoNumberRadio = within(
      screen.getByRole('group', { name: USCIS_NUMBER_NAME })
    ).getByLabelText('No')

    await act(() => user.click(USCISNoNumberRadio))
  })

  it('Opens USCIS number help modal', async () => {
    const user = userEvent.setup()

    const {
      yesPermanentResidentRadio,
      queryModalHeading,
      queryContinueButton,
    } = renderIdentityPage({})

    await act(() => user.click(yesPermanentResidentRadio))

    const button = screen.getByRole('button', { name: 'Need help finding it?' })

    await act(() => user.click(button))
    expect(queryModalHeading()).toBeInTheDocument()

    const jsdomOpen = window.open
    window.open = () => null
    const continueButton = queryContinueButton()
    expect(continueButton).toBeInTheDocument()

    await act(() =>
      user.click(screen.getByRole('button', { name: 'Continue' }))
    )
    window.open = jsdomOpen
  })

  it('Shows required messages if no input given', async () => {
    const user = userEvent.setup()

    const {
      nextButton,
      queryForErrorMessage,
      yesPermanentResidentRadio,
      yesDLRadio,
    } = renderIdentityPage({})

    await act(() => user.click(nextButton))

    expect(queryForErrorMessage(SSN_REQUIRED_MESSAGE)).toBeInTheDocument()
    expect(queryForErrorMessage(DL_REQUIRED_MESSAGE)).toBeInTheDocument()
    expect(queryForErrorMessage(WORK_REQUIRED_MESSAGE)).toBeInTheDocument()

    await act(() => user.click(yesDLRadio))
    await act(() => user.click(nextButton))

    expect(queryForErrorMessage(DL_NUMBER_REQUIRED_MESSAGE)).toBeInTheDocument()

    await act(() => user.click(yesPermanentResidentRadio))
    await act(() => user.click(nextButton))

    const IS_REQUIRED = 'is required'

    expect(
      queryForErrorMessage(`First name ${IS_REQUIRED}`)
    ).toBeInTheDocument()
    expect(
      queryForErrorMessage(`Middle initial ${IS_REQUIRED}`)
    ).toBeInTheDocument()
    expect(queryForErrorMessage(`Last name ${IS_REQUIRED}`)).toBeInTheDocument()
    expect(queryForErrorMessage(USCIS_REQUIRED)).toBeInTheDocument()
    expect(queryForErrorMessage(COUNTRY_OF_ORIGIN_REQUIRED)).toBeInTheDocument()

    const yesRadio = within(
      screen.getByRole('group', { name: USCIS_NUMBER_NAME })
    ).getByLabelText('Yes')

    await act(() => user.click(yesRadio))
    await act(() => user.click(nextButton))

    expect(queryForErrorMessage(USCIS_NUM_REQUIRED)).toBeInTheDocument()
    expect(
      queryForErrorMessage(USCIS_NUM_RE_ENTER_REQUIRED)
    ).toBeInTheDocument()
  })

  it('Successfully submits with required inputs', async () => {
    const user = userEvent.setup()
    const consoleSpy = jest.spyOn(console, 'log')

    const { nextButton, noDLRadio, yesUSNationalRadio } = renderIdentityPage({
      importedSsn: '123-45-6789',
      importedDateOfBirth: '12/28/1969',
    })

    await act(() => {
      user.click(noDLRadio)
      user.click(yesUSNationalRadio)
      user.click(nextButton)
    })

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith({
        dateOfBirth: '12/28/1969',
        hasDriversLicenseOrStateId: false,
        ssn: '123-45-6789',
        workAuthorizationType: 'usCitizenOrNational',
      })
    })
  })
})
