import { Meta, StoryObj } from '@storybook/react'
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
import { Label } from '@trussworks/react-uswds'
import { mixed } from 'yup'

const formLibraryPreferenceOptions = ['formik', 'reactHookForm'] as const
type FormLibraryPreferenceOption = (typeof formLibraryPreferenceOptions)[number]

const checkboxFieldGroupOptions = ['option1', 'option2', 'option3'] as const
const tempMapping = ['making coffee', 'clearing data', 'not using formik'] //pull from i18 file instead
type CheckboxFieldGroupOption = (typeof checkboxFieldGroupOptions)[number]
const schema = yup
  .object({
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
      .required(),
  })
  .required()

type ExampleFieldValues = {
  formLibraryPreference?: FormLibraryPreferenceOption
  whyIsFormikBad?: string
}
const defaultValues: ExampleFieldValues = {
  formLibraryPreference: undefined,
  whyIsFormikBad: undefined,
}
const ExampleForm = () => {
  const hookFormMethods = useForm<ExampleFieldValues>({
    defaultValues,
    resolver: yupResolver(schema),
  })
  const {
    register,
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
            <div>
              <label htmlFor="whyIsFormikBad">Why is Formik bad?</label>
              <span className="usa-error-message" role="alert">
                {errors.whyIsFormikBad?.message}
              </span>
              <input {...register('whyIsFormikBad')} />
            </div>
            <br />
          </>
        )}
        <CheckboxGroupField
          legend="React hook makes which of the following easier"
          name="rhfIsEasy"
          options={checkboxFieldGroupOptions.map((option, index) => ({
            label: tempMapping[index],
            value: option,
            checkboxProps: {
              tile: true,
              onChange: (e) => {
                console.log('I am an example of adding an onchange')
                if (e.target.checked) {
                  console.log(option + ' is checked')
                }
              },
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
