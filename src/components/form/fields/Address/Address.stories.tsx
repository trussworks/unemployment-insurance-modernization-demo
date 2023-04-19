import { yupResolver } from '@hookform/resolvers/yup'
import { Meta, StoryFn } from '@storybook/react'
import { noop } from 'helpers/noop/noop'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

import Address, { IAddressLabels } from './Address'

export default {
  title: 'Components/Form/Address',
  component: Address,
} as Meta<typeof Address>

const Template: StoryFn<typeof Address> = (args) => {
  const { t: tCommon } = useTranslation('common')
  type Address = {
    address: IAddressLabels
  }
  const initialValues = {
    address: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: '',
    },
  }

  const validationSchema = yup.object().shape({
    address: yup.object().shape({
      address1: yup.string().required(tCommon('validation.required')),
      address2: yup.string().optional(),
      city: yup.string().required(tCommon('validation.required')),
      state: yup.string().required(tCommon('validation.required')),

      zipcode: yup
        .string()
        // eslint-disable-next-line security/detect-unsafe-regex
        .matches(/^\d{5}(-\d{4})?$/, tCommon('validation.notZipCode'))
        .required(tCommon('validation.required')),
    }),
  })

  const hookFormMethods = useForm<Address>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  })

  return (
    <FormProvider {...hookFormMethods}>
      <form onSubmit={noop}>
        <Address basename={args.basename} optAddress2={args.optAddress2} />
      </form>
    </FormProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  basename: 'address',
}

export const WithSecondAddress = Template.bind({})
WithSecondAddress.args = {
  basename: 'address',
  optAddress2: true,
}
