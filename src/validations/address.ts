import { statesAndTerritories } from 'fixtures/states_and_territories'
import { i18n_components } from 'i18n/i18n'
import { object, string } from 'yup'

export const yupAddress = () =>
  object().shape({
    address: string()
      .max(64, i18n_components.t('address.address.errors.maxLength'))
      .required(i18n_components.t('address.address.errors.required')),
    city: string()
      .max(64, i18n_components.t('address.city.errors.maxLength'))
      .matches(
        /^([^0-9]*)$/,
        i18n_components.t('address.city.errors.noNumbers')
      )
      .required(i18n_components.t('address.city.errors.required')),
    state: string()
      .oneOf(
        Object.keys(statesAndTerritories),
        i18n_components.t('address.state.errors.required')
      )
      .required(i18n_components.t('address.state.errors.required')),
    zipcode: string()
      .matches(
        // eslint-disable-next-line security/detect-unsafe-regex
        /^\d{5}(-\d{4})?$/,
        i18n_components.t('address.zipcode.errors.format')
      )
      .required(i18n_components.t('address.zipcode.errors.required')),
  })
