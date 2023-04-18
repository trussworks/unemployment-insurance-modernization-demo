import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@trussworks/react-uswds'
import Address from 'components/form/fields/Address/Address'
import { RadioField } from 'components/form/fields/RadioField/RadioField'
import TextField from 'components/form/fields/TextField/TextField'
import { YesNoQuestion } from 'components/form/fields/YesNoQuestion/YesNoQuestion'
import { PhoneNumberField } from 'components/form/PhoneNumberField/PhoneNumberField'
import { PageLayout } from 'components/PageLayout/PageLayout'
import {
  UNTOUCHED_RADIO_VALUE,
  UntouchedRadioValue,
} from 'constants/formOptions'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PhoneInput, YesNoInput } from 'types/input'
import { yupAddress } from 'validations/address'
import { yupPhone, yupPhoneOptional } from 'validations/phone'
import { boolean, mixed, object, string } from 'yup'

export type EmployerAddressInput = {
  address: string
  address2: string
  address3: string
  city: string
  state: string
  zipcode: string
}

export const changeInEmploymentOptions = [
  'laid_off',
  'fired_discharged_suspended',
  'unsatisfactory_work_performance',
  'quit_or_retired',
  'still_employed',
  'strike_or_lock_out_by_employer',
] as const
export type ChangeInEmploymentOption =
  (typeof changeInEmploymentOptions)[number]

const EMPLOYER_ADDRESS_SKELETON: EmployerAddressInput = {
  address: '',
  address2: '',
  address3: '',
  city: '',
  state: '',
  zipcode: '',
}
export const PHONE_SKELETON: PhoneInput = {
  number: '',
  sms: UNTOUCHED_RADIO_VALUE,
}

export type EmployerValues = {
  employer_address: EmployerAddressInput
  employer_phone: PhoneInput

  employer_name: string
  is_full_time: YesNoInput
  separation_circumstance: ChangeInEmploymentOption | UntouchedRadioValue

  employment_start_date: string
  employment_last_date: string

  is_employer_phone_accurate: YesNoInput
  work_location_phone: PhoneInput

  self_employed: YesNoInput
  is_owner: YesNoInput
}
const defaultValues: EmployerValues = {
  // Your Employer
  employer_name: '',
  employer_address: { ...EMPLOYER_ADDRESS_SKELETON },
  employer_phone: { ...PHONE_SKELETON },
  is_full_time: UNTOUCHED_RADIO_VALUE,
  // Work Location

  is_employer_phone_accurate: UNTOUCHED_RADIO_VALUE,
  work_location_phone: { ...PHONE_SKELETON },

  // Business Interests
  self_employed: UNTOUCHED_RADIO_VALUE,
  is_owner: UNTOUCHED_RADIO_VALUE,

  // Change in Employment
  separation_circumstance: UNTOUCHED_RADIO_VALUE,
  employment_start_date: '',
  employment_last_date: '',
}

export const Employer = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'employer' })
  const { t: tCommon } = useTranslation('common', { keyPrefix: 'button_text' })
  const myLabels = {
    address: t('your_employer.employer_address.address.label'),
    address2: t('your_employer.employer_address.address2.label'),
    address3: t('your_employer.employer_address.address3.label'),
    city: t('your_employer.employer_address.city.label'),
    state: t('your_employer.employer_address.state.label'),
    zipcode: t('your_employer.employer_address.zipcode.label'),
  }
  const schema = object().shape({
    employer_name: string()
      .trim()
      .max(64, t('your_employer.employer_name.errors.maxLength'))
      .required(t('your_employer.employer_name.errors.required')),

    employer_address: yupAddress(),
    employer_phone: yupPhone,
    is_full_time: string().required(
      t('your_employer.is_full_time.errors.required')
    ),
    self_employed: boolean()
      .nullable()
      .required(t('business_interests.self_employed.errors.required')),
    is_owner: boolean()
      .nullable()
      .required(t('business_interests.is_owner.errors.required')),
    is_employer_phone_accurate: boolean()
      .nullable()
      .required(t('your_employer.is_employer_phone_accurate.errors.required')),
    work_location_phone: mixed().when('is_employer_phone_accurate', {
      is: false,
      then: yupPhoneOptional,
    }),
    separation_circumstance: string()
      .oneOf([...changeInEmploymentOptions])
      .nullable()
      .required(t('separation.reason.errors.required')),
  })

  const hookFormMethods = useForm<EmployerValues>({
    defaultValues,
    resolver: yupResolver(schema),
  })
  const { handleSubmit } = hookFormMethods

  const onSubmit: SubmitHandler<EmployerValues> = (data) => {
    console.log(data)
  }

  const phone_is_accurate = hookFormMethods.watch('is_employer_phone_accurate')

  return (
    <PageLayout heading={t('header')}>
      <FormProvider {...hookFormMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="margin-bottom-1">
            <h4>{t('your_employer.section_title')}</h4>
            <TextField
              name={'employer_name'}
              label={t('your_employer.employer_name.label')}
              hint={t('your_employer.employer_name.hint')}
              type="text"
              data-testid={t('your_employer.employer_name')}
            />
            <YesNoQuestion
              name={`is_full_time`}
              question={t('your_employer.is_full_time.label')}
              yesLabel={t('your_employer.is_full_time.options.full_time')}
              noLabel={t('your_employer.is_full_time.options.part_time')}
              isStacked
            />
            <Address
              basename="employer_address"
              labels={myLabels}
              optAddress2
            />
            <PhoneNumberField
              name="employer_phone"
              label={t('your_employer.employer_phone.label')}
              showSMS={false}
            />
            <YesNoQuestion
              question={t('your_employer.is_employer_phone_accurate.label')}
              name={`is_employer_phone_accurate`}
            />
            {phone_is_accurate === false && (
              <PhoneNumberField
                name={`work_location_phone`}
                label={t('your_employer.work_location_phone.label')}
                showSMS={false}
              />
            )}
            <h4>{t('business_interests.section_title')}</h4>

            <YesNoQuestion
              name={`self_employed`}
              question={t('business_interests.self_employed.label')}
            />
            <YesNoQuestion
              name={`is_owner`}
              question={t('business_interests.is_owner.label')}
            />
            <h4>{t('separation.section_title')}</h4>
            <RadioField
              name={`separation_circumstance`}
              legend={t('separation.reason.label')}
              tile={true}
              options={changeInEmploymentOptions.map((option) => {
                return {
                  label: t(`separation.reason.options.${option}.label`),
                  labelDescription: t(
                    `separation.reason.options.${option}.description`
                  ),
                  value: option,
                }
              })}
            />
          </div>

          {/* <DateInputField
        name={`employment_start_date`}
        legend={t('employment_start_date.label')}
      />
      <DateInputField
        name={`employment_last_date`}
        legend={t('employment_last_date.label')}
       
      /> */}
          <Button type="submit">{tCommon('continue')}</Button>
        </form>
      </FormProvider>
    </PageLayout>
  )
}
