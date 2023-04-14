import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@trussworks/react-uswds'
import Address from 'components/form/fields/Address/Address'
import TextField from 'components/form/fields/TextField/TextField'
import { YesNoQuestion } from 'components/form/fields/YesNoQuestion/YesNoQuestion'
import { PageLayout } from 'components/PageLayout/PageLayout'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { object, string } from 'yup'

export type EmployerAddressInput = {
  address: string
  address2: string
  address3: string
  city: string
  state: string
  zipcode: string
}
const EMPLOYER_ADDRESS_SKELETON: EmployerAddressInput = {
  address: '',
  address2: '',
  address3: '',
  city: '',
  state: '',
  zipcode: '',
}
type EmployerValues = {
  ssn: string
}
const defaultValues: EmployerValues = {
  // Your Employer
  employer_name: '',
  employer_address: { ...EMPLOYER_ADDRESS_SKELETON },
  employer_phone: { ...PHONE_SKELETON },
  is_full_time: UNTOUCHED_RADIO_VALUE,
  // Work Location
  worked_at_employer_address: UNTOUCHED_RADIO_VALUE,
  alternate_physical_work_address: { ...ADDRESS_WITHOUT_STREET_SKELETON },
  is_employer_phone_accurate: UNTOUCHED_RADIO_VALUE,
  work_location_phone: { ...PHONE_SKELETON },

  // Business Interests
  self_employed: UNTOUCHED_RADIO_VALUE,
  is_owner: UNTOUCHED_RADIO_VALUE,

  // Change in Employment
  separation_circumstance: UNTOUCHED_RADIO_VALUE,
  separation_circumstance_details: '',
  employment_start_date: '',
  employment_last_date: '',
  reason_still_employed: '',
  hours_reduced_twenty_percent: UNTOUCHED_RADIO_VALUE,
  expect_to_be_recalled: UNTOUCHED_RADIO_VALUE,
  definite_recall: UNTOUCHED_RADIO_VALUE,
  definite_recall_date: '',
  is_seasonal_work: UNTOUCHED_RADIO_VALUE,
  discharge_date: '',
  // Other pay
  payments_received: [] as PaymentsReceivedDetailInput[],
  LOCAL_pay_types: [] as PayTypeOption[],
}

export const Employer = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'employer' })

  const schema = object().shape({
    is_full_time: string().required(
      t('your_employer.is_full_time.errors.required')
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
  const myLabels = {
    address: t('your_employer.employer_address.address.label'),
    address2: t('your_employer.employer_address.address2.label'),
    address3: t('your_employer.employer_address.address3.label'),
    city: t('your_employer.employer_address.city.label'),
    state: t('your_employer.employer_address.state.label'),
    zipcode: t('your_employer.employer_address.zipcode.label'),
  }
  return (
    <PageLayout heading={t('header')}>
      <FormProvider {...hookFormMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="margin-bottom-1">
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
          </div>

          <Button type="submit">{t('continue')}</Button>
        </form>
      </FormProvider>
    </PageLayout>
  )
}
