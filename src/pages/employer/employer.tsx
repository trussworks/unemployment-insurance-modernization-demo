import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@trussworks/react-uswds'
import Address from 'components/form/fields/Address/Address'
import { DateInputField } from 'components/form/fields/DateInputField/DateInputField'
import { PhoneNumberField } from 'components/form/fields/PhoneNumberField/PhoneNumberField'
import { RadioField } from 'components/form/fields/RadioField/RadioField'
import TextField from 'components/form/fields/TextField/TextField'
import { YesNoQuestion } from 'components/form/fields/YesNoQuestion/YesNoQuestion'
import { SectionHeading } from 'components/form/SectionHeading/SectionHeading'
import { PageLayout } from 'components/PageLayout/PageLayout'
import {
  UNTOUCHED_RADIO_VALUE,
  UntouchedRadioValue,
} from 'constants/formOptions'
import i18n from 'i18n/i18n'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { PhoneInput, YesNoInput } from 'types/input'
import { yupDate } from 'utils/validations/date'
import { yupAddress } from 'validations/address'
import { yupPhone } from 'validations/phone'
import { boolean, object, string } from 'yup'

const tEmployer = i18n.getFixedT(null, 'pages', 'employer')
const tCommon = i18n.getFixedT(null, 'common', 'button_text')

export type EmployerAddressInput = {
  address: string
  address2: string
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
  const myLabels = {
    address: tEmployer('your_employer.employer_address.address.label'),
    address2: tEmployer('your_employer.employer_address.address2.label'),
    city: tEmployer('your_employer.employer_address.city.label'),
    state: tEmployer('your_employer.employer_address.state.label'),
    zipcode: tEmployer('your_employer.employer_address.zipcode.label'),
  }
  const schema = object().shape({
    employer_name: string()
      .trim()
      .max(64, tEmployer('your_employer.employer_name.errors.maxLength'))
      .required(tEmployer('your_employer.employer_name.errors.required')),

    employer_address: yupAddress(),
    employer_phone: yupPhone(true),
    is_full_time: string().required(
      tEmployer('your_employer.is_full_time.errors.required')
    ),
    self_employed: boolean()
      .nullable()
      .required(tEmployer('business_interests.self_employed.errors.required')),
    is_owner: boolean()
      .nullable()
      .required(tEmployer('business_interests.is_owner.errors.required')),
    is_employer_phone_accurate: boolean()
      .nullable()
      .required(
        tEmployer('your_employer.is_employer_phone_accurate.errors.required')
      ),
    work_location_phone: yupPhone(false),
    separation_circumstance: string()
      .oneOf([...changeInEmploymentOptions])
      .nullable()
      .required(tEmployer('separation.reason.errors.required')),
    employment_start_date: yupDate().required(
      tEmployer('separation.employment_start_date.errors.required')
    ),
    employment_last_date: yupDate().required(
      tEmployer('separation.employment_last_date.errors.required')
    ),
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
    <PageLayout heading={tEmployer('header')}>
      <FormProvider {...hookFormMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="margin-bottom-1">
            <SectionHeading>
              {tEmployer('your_employer.section_title')}
            </SectionHeading>
            <TextField
              name={'employer_name'}
              label={tEmployer('your_employer.employer_name.label')}
              hint={tEmployer('your_employer.employer_name.hint')}
              type="text"
              data-testid={tEmployer('your_employer.employer_name')}
            />
            <YesNoQuestion
              name={`is_full_time`}
              question={tEmployer('your_employer.is_full_time.label')}
              yesLabel={tEmployer(
                'your_employer.is_full_time.options.full_time'
              )}
              noLabel={tEmployer(
                'your_employer.is_full_time.options.part_time'
              )}
              isStacked
            />
            <Address
              basename="employer_address"
              labels={myLabels}
              optAddress2
            />
            <PhoneNumberField
              name="employer_phone"
              label={tEmployer('your_employer.employer_phone.label')}
              showSMS={false}
            />
            <YesNoQuestion
              question={tEmployer(
                'your_employer.is_employer_phone_accurate.label'
              )}
              name={`is_employer_phone_accurate`}
            />
            {phone_is_accurate === false && (
              <PhoneNumberField
                name={`work_location_phone`}
                label={tEmployer('your_employer.work_location_phone.label')}
                showSMS={false}
              />
            )}
            <SectionHeading>
              {tEmployer('business_interests.section_title')}
            </SectionHeading>
            <YesNoQuestion
              name={`self_employed`}
              question={tEmployer('business_interests.self_employed.label')}
            />
            <YesNoQuestion
              name={`is_owner`}
              question={tEmployer('business_interests.is_owner.label')}
            />
            <SectionHeading>
              {tEmployer('separation.section_title')}
            </SectionHeading>
            <RadioField
              name={`separation_circumstance`}
              legend={tEmployer('separation.reason.label')}
              tile={true}
              options={changeInEmploymentOptions.map((option) => {
                return {
                  label: tEmployer(`separation.reason.options.${option}.label`),
                  labelDescription: tEmployer(
                    `separation.reason.options.${option}.description`
                  ),
                  value: option,
                }
              })}
            />
            <DateInputField
              name={`employment_start_date`}
              legend={tEmployer('separation.employment_start_date.label')}
            />
            <DateInputField
              name={`employment_last_date`}
              legend={tEmployer('separation.employment_last_date.label')}
            />
          </div>
          <Button type="submit">{tCommon('continue')}</Button>
        </form>
      </FormProvider>
    </PageLayout>
  )
}
