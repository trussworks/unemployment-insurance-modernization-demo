import { yupResolver } from '@hookform/resolvers/yup'
import { Meta, StoryObj } from '@storybook/react'
import CheckboxField from 'components/form/fields/CheckboxField/CheckboxField'
import { CheckboxGroupField } from 'components/form/fields/CheckboxGroupField/CheckboxGroupField'
import { RadioField } from 'components/form/fields/RadioField/RadioField'
import TextField from 'components/form/fields/TextField/TextField'
import { YesNoQuestion } from 'components/form/fields/YesNoQuestion/YesNoQuestion'
import { ChangeEventHandler } from 'react'
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import * as yup from 'yup'
import { mixed } from 'yup'

const formLibraryPreferenceOptions = ['formik', 'reactHookForm'] as const
type FormLibraryPreferenceOption = (typeof formLibraryPreferenceOptions)[number]

const checkboxFieldGroupOptions = ['option1', 'option2', 'option3'] as const
type CheckboxFieldGroupOption = (typeof checkboxFieldGroupOptions)[number]
const tempMapping = ['making coffee', 'clearing data', 'not using formik'] //pull from i18 file instead
const schema = yup
  .object({
    doYouLikeForms: yup.boolean().required(),
    formLibraryPreference: yup
      .string()
      .oneOf([...formLibraryPreferenceOptions])
      .required(),
    whyIsFormikBad: yup.string().when('formLibraryPreference', {
      is: 'reactHookForm',
      then: (schema) => schema.required(),
    }),
    subscribe: yup.boolean().required(),
    rhfIsEasy: yup
      .array()
      .of(mixed().oneOf([...checkboxFieldGroupOptions]))
      .min(1, 'Select at least one')
      .required(),
  })
  .required()

type ExampleFieldValues = {
  doYouLikeForms?: boolean
  formLibraryPreference?: FormLibraryPreferenceOption
  whyIsFormikBad?: string
  subscribe?: boolean
  rhfIsEasy: CheckboxFieldGroupOption[]
}
const defaultValues: ExampleFieldValues = {
  doYouLikeForms: undefined,
  formLibraryPreference: undefined,
  whyIsFormikBad: undefined,
  subscribe: true,
  rhfIsEasy: [],
}
const ExampleForm = () => {
  const hookFormMethods = useForm<ExampleFieldValues>({
    defaultValues,
    resolver: yupResolver(schema),
  })
  const { handleSubmit, watch, resetField } = hookFormMethods

  const formLibraryPreference = watch('formLibraryPreference')

  const onSubmit: SubmitHandler<ExampleFieldValues> = (data) =>
    console.log(data)

  const onSubmitError: SubmitErrorHandler<ExampleFieldValues> = (errors) =>
    console.log(errors)

  const handleFormLibraryPreferenceChange: ChangeEventHandler<
    HTMLInputElement
  > = async (e) => {
    if (e.target.value === 'formik') {
      resetField('whyIsFormikBad')
    }
  }

  return (
    <FormProvider {...hookFormMethods}>
      <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
        <YesNoQuestion name="doYouLikeForms" question="Do you like forms?" />
        <RadioField
          name="formLibraryPreference"
          legend="Which form Library is better?"
          options={formLibraryPreferenceOptions.map((option) => ({
            label: option,
            value: option,
          }))}
          onChange={handleFormLibraryPreferenceChange}
        />

        <br />

        {formLibraryPreference && formLibraryPreference !== 'formik' && (
          <>
            <TextField
              label="Why is Formik bad?"
              name="whyIsFormikBad"
              type="text"
            />
            <br />
          </>
        )}
        <CheckboxGroupField
          legend="react-hook-form makes which of the following easier"
          name="rhfIsEasy"
          options={checkboxFieldGroupOptions.map((option, index) => ({
            label: tempMapping.at(index),
            value: option,
            checkboxProps: {
              tile: true,
            },
          }))}
        />
        <CheckboxField
          name="subscribe"
          label="I want to subscribe to hear more about react-hook-form ."
        />
        <br></br>
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  )
}

const meta = {
  title: 'Example/ReactHookForm',
  component: ExampleForm,
} satisfies Meta<typeof ExampleForm>

export default meta
type Story = StoryObj<typeof ExampleForm>

export const ReactHookForm: Story = {}
