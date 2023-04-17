import { yupResolver } from '@hookform/resolvers/yup'
import { Meta, StoryFn } from '@storybook/react'
import { noop } from 'helpers/noop/noop'
import { FormProvider, useForm } from 'react-hook-form'
import { PhoneInput } from 'types/input'
import { yupPhoneWithSMS } from 'validations/phone'
import * as yup from 'yup'

import { PhoneNumberField } from './PhoneNumberField'

export default {
  title: 'Components/Form/PhoneNumberField',
  component: PhoneNumberField,
} as Meta<typeof PhoneNumberField>

const Template: StoryFn<typeof PhoneNumberField> = (args) => {
  const initialValues = {
    [args.name]: {
      number: '',
      sms: false,
    },
  }

  const validationSchema = yup.object().shape({ [args.name]: yupPhoneWithSMS })
  const hookFormMethods = useForm<PhoneInput>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  })

  return (
    <FormProvider {...hookFormMethods}>
      <form onSubmit={noop}>
        <PhoneNumberField {...args} />
      </form>
    </FormProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  name: 'sample_phone',
  label: 'Enter your phone number:',
}
