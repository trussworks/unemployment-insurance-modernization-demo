import { UntouchedRadioValue } from 'constants/formOptions'

export type YesNoInput = boolean | UntouchedRadioValue
// export type CheckboxInput = boolean | UntouchedCheckboxValue

export type PhoneInput = {
  number: string
  sms: YesNoInput
}
