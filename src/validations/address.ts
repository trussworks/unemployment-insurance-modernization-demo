import { statesAndTerritories } from 'fixtures/states_and_territories'
import i18n from 'i18n/i18n'
import { object, string } from 'yup'

const tAddress = i18n.getFixedT(null, 'components', 'address')

export const yupAddress = () =>
  object().shape({
    address: string()
      .max(64, tAddress('address.errors.maxLength'))
      .required(tAddress('address.errors.required')),
    city: string()
      .max(64, tAddress('city.errors.maxLength'))
      .matches(/^([^0-9]*)$/, tAddress('city.errors.noNumbers'))
      .required(tAddress('city.errors.required')),
    state: string()
      .oneOf(
        Object.keys(statesAndTerritories),
        tAddress('state.errors.required')
      )
      .required(tAddress('state.errors.required')),
    zipcode: string()
      .matches(
        // eslint-disable-next-line security/detect-unsafe-regex
        /^\d{5}(-\d{4})?$/,
        tAddress('zipcode.errors.format')
      )
      .required(tAddress('zipcode.errors.required')),
  })
