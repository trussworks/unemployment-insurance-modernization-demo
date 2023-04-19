import { i18n_components } from 'i18n/i18n'
import { boolean, object, string } from 'yup'

export const yupPhone = (
  phoneIsRequired: boolean,
  smsIsRequired: boolean = false
) => {
  let phoneSchema = string()
    .transform((number) => (!number ? undefined : number))
    .matches(
      /^[(]?\d{3}[)]?[-\s.]?\d{3}[-\s.]?\d{4}$/,
      i18n_components.t('phoneNumberField.phone_number.errors.matches')
    )
    .min(10)
    .max(13)
  let smsSchema = boolean().nullable()

  if (phoneIsRequired) {
    phoneSchema = phoneSchema.required(
      i18n_components.t('phoneNumberField.phone_number.errors.required')
    )
  }
  if (smsIsRequired) {
    smsSchema = smsSchema.required(
      i18n_components.t('phoneNumberField.sms.errors.required')
    )
  }

  return object().shape({
    number: phoneSchema,
    sms: smsSchema,
  })
}
