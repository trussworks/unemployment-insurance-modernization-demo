import { i18n_components } from 'i18n/i18n'
import { boolean, object, string } from 'yup'

export const yupPhone = object().shape({
  number: string()
    .matches(
      /^[(]?\d{3}[)]?[-\s.]?\d{3}[-\s.]?\d{4}$/,
      i18n_components.t('phoneNumberField.phone_number.errors.matches')
    )
    .min(10)
    .max(13)
    .required(
      i18n_components.t('phoneNumberField.phone_number.errors.required')
    ),
  sms: boolean().nullable(),
})

export const yupPhoneWithSMS = object().shape({
  number: string()
    .matches(
      /^[(]?\d{3}[)]?[-\s.]?\d{3}[-\s.]?\d{4}$/,
      i18n_components.t('phoneNumberField.phone_number.errors.matches')
    )
    .min(10)
    .max(13)
    .required(
      i18n_components.t('phoneNumberField.phone_number.errors.required')
    ),
  sms: boolean()
    .nullable()
    .required(
      i18n_components.t('phoneNumberField.phone_number.errors.required')
    ),
})
export const yupPhoneOptional = object().shape({
  number: string()
    .transform((number) => (!number ? undefined : number))
    .matches(
      /^[(]?\d{3}[)]?[-\s.]?\d{3}[-\s.]?\d{4}$/,
      i18n_components.t('phoneNumberField.phone_number.errors.matches')
    )
    .min(10)
    .max(13),
  sms: boolean().nullable(),
})
