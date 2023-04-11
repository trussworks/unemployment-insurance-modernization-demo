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

const formLibraryPreferenceOptions = ['formik', 'reactHookForm'] as const
type FormLibraryPreferenceOption = (typeof formLibraryPreferenceOptions)[number]

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
    setValue,
    formState: { errors },
  } = hookFormMethods

  const formLibraryPreference = watch('formLibraryPreference')
  console.log({ formLibraryPreference })

  const onSubmit: SubmitHandler<ExampleFieldValues> = (data) =>
    console.log(data)

  const onSubmitError: SubmitErrorHandler<ExampleFieldValues> = (errors) =>
    console.log(errors)

  const handleFormLibraryPreferenceChange: ChangeEventHandler<
    HTMLInputElement
  > = async (e) => {
    console.log('CALLING CUSTOM ON CHANGE')
    if (e.target.value === 'formik') {
      setValue('whyIsFormikBad', defaultValues.whyIsFormikBad)
    }
  }

  return (
    <FormProvider {...hookFormMethods}>
      <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
        <RadioField
          name="formLibraryPreference"
          legend="Which form Library is better?"
          options={formLibraryPreferenceOptions.map((option) => ({
            label: option, // TODO i18n
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
