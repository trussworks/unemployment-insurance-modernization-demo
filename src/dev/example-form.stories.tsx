import { Meta, StoryObj } from '@storybook/react'
import { YesNoQuestion } from 'components/form/fields/YesNoQuestion/YesNoQuestion'
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { ChangeEventHandler } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { RadioField } from 'components/form/fields/RadioField/RadioField'
import CheckboxField from 'components/form/fields/CheckboxField/CheckboxField'
import { CheckboxGroupField } from 'components/form/fields/CheckboxGroupField/CheckboxGroupField'
import { mixed } from 'yup'
import TextField from 'components/form/fields/TextField/TextField'

const formLibraryPreferenceOptions = ['formik', 'reactHookForm'] as const
type FormLibraryPreferenceOption = (typeof formLibraryPreferenceOptions)[number]

const checkboxFieldGroupOptions = ['option1', 'option2', 'option3'] as const
const tempMapping = ['making coffee', 'clearing data', 'not using formik'] //pull from i18 file instead
type CheckboxFieldGroupOption = (typeof checkboxFieldGroupOptions)[number]
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
    exampleSingleCheckbox: yup.boolean().required(),
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
}
const defaultValues: ExampleFieldValues = {
  doYouLikeForms: undefined,
  formLibraryPreference: undefined,
  whyIsFormikBad: undefined,
}
const ExampleForm = () => {
  const hookFormMethods = useForm<ExampleFieldValues>({
    defaultValues,
    resolver: yupResolver(schema),
  })
  const {
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = hookFormMethods

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
            label: tempMapping[index],
            value: option,
            checkboxProps: {
              tile: true,
            },
          }))}
        />
        <CheckboxField
          name="exampleSingleCheckbox"
          label="I have reached the end of this example form."
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
