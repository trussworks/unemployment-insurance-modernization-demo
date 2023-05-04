import { yupResolver } from '@hookform/resolvers/yup'
import { Meta, StoryObj } from '@storybook/react'
import CheckboxField from 'components/form/fields/CheckboxField/CheckboxField'
import { CheckboxGroupField } from 'components/form/fields/CheckboxGroupField/CheckboxGroupField'
import { DateInputField } from 'components/form/fields/DateInputField/DateInputField'
import DropdownField, {
  EMPTY_DROPDOWN_OPTION,
} from 'components/form/fields/DropdownField/DropdownField'
import { RadioField } from 'components/form/fields/RadioField/RadioField'
import TextField from 'components/form/fields/TextField/TextField'
import { YesNoQuestion } from 'components/form/fields/YesNoQuestion/YesNoQuestion'
import { ImportedField } from 'components/ImportedInputBox/ImportedField/ImportedField'
import { ImportedInputBox } from 'components/ImportedInputBox/ImportedInputBox'
import { ChangeEventHandler } from 'react'
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { yupDate } from 'utils/validations/date'
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
    whenDidYouStartLikingForms: yupDate(),
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
    bestBeverage: yup
      .string()
      .required('You must select your beverage of choice'),
  })
  .required()

type ExampleFieldValues = {
  doYouLikeForms?: boolean
  formLibraryPreference?: FormLibraryPreferenceOption
  whyIsFormikBad?: string
  subscribe?: boolean
  rhfIsEasy: CheckboxFieldGroupOption[]
  bestBeverage: string
}
const defaultValues: ExampleFieldValues = {
  doYouLikeForms: undefined,
  formLibraryPreference: undefined,
  whyIsFormikBad: undefined,
  subscribe: true,
  rhfIsEasy: [],
  bestBeverage: EMPTY_DROPDOWN_OPTION,
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
        <ImportedInputBox>
          <ImportedField label="Profession">Software Engineer</ImportedField>
          <ImportedField label="Hobbies">Entomology</ImportedField>
        </ImportedInputBox>
        <YesNoQuestion name="doYouLikeForms" question="Do you like forms?" />
        <DateInputField
          name="whenDidYouStartLikingForms"
          legend="What exact day did you start liking forms?"
        />
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
        <DropdownField
          name="bestBeverage"
          label="Which beverage is best while coding?"
          startEmpty
          options={[
            { label: 'Water', value: 'water' },
            { label: 'Kombucha', value: 'kombucha' },
            { label: 'Coffee', value: 'coffee' },
            { label: 'Tea', value: 'tea' },
            { label: 'Soda', value: 'soda' },
          ]}
        />
        <CheckboxField
          name="subscribe"
          label="I want to subscribe to hear more about react-hook-form"
        />
        <br />
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
