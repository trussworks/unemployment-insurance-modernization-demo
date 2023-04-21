import i18n from 'i18n/i18n'
import { boolean, object, string } from 'yup'
const tPhone = i18n.getFixedT(null, 'components', 'phoneNumberField')

export const yupPhone = (
  phoneIsRequired: boolean,
  smsIsRequired: boolean = false
) => {
  let phoneSchema = string()
    .transform((number) => (!number ? undefined : number))
    .matches(
      /^[(]?\d{3}[)]?[-\s.]?\d{3}[-\s.]?\d{4}$/,
      tPhone('phone_number.errors.matches')
    )
    .min(10)
    .max(13)
  let smsSchema = boolean()

  if (phoneIsRequired) {
    phoneSchema = phoneSchema.required(tPhone('phone_number.errors.required'))
  }
  if (smsIsRequired) {
    smsSchema = smsSchema.required(tPhone('sms.errors.required'))
  }

  return object().shape({
    number: phoneSchema,
    sms: smsSchema,
  })
}
