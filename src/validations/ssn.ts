import i18n from 'i18n/i18n'
import { getFormattedSsn } from 'utils/format'
import { string } from 'yup'

const tSsn = i18n.getFixedT(null, 'pages', 'ssn')

export const yupSsn = string()
  .required(tSsn('ssn.errors.required'))
  .matches(/^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/, tSsn('ssn.errors.badFormat'))
  .test('ssn', tSsn('ssn.errors.invalid'), (value) =>
    /^(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/.test(
      getFormattedSsn(value)
    )
  )
