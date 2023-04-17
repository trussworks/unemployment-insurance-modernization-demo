import { ChangeEventHandler, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import TextField from '../fields/TextField/TextField'
import { YesNoQuestion } from '../fields/YesNoQuestion/YesNoQuestion'

type PhoneNumberFieldProps = {
  id?: string
  name: string
  label: ReactNode
  showSMS?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export const PhoneNumberField = ({
  id: idProp,
  name,
  label,
  showSMS = true,
  onChange,
}: PhoneNumberFieldProps) => {
  const { t } = useTranslation('components', {
    keyPrefix: 'phoneNumberField',
  })

  const id = idProp || name

  return (
    <>
      <TextField
        id={`${id}.number`}
        name={`${name}.number`}
        label={label}
        type="tel"
        onChange={onChange}
      />
      {showSMS && (
        <YesNoQuestion
          question={t('sms.label')}
          hint={t('sms.help_text')}
          name={`${name}.sms`}
        />
      )}
    </>
  )
}
