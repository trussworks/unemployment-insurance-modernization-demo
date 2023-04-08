import { Meta, StoryObj } from '@storybook/react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { ChangeEventHandler } from 'react'

const formLibraryPreferenceOptions = ['formik', 'reactHookForm'] as const
type FormLibraryPreferenceOption = (typeof formLibraryPreferenceOptions)[number]

type ExampleFieldValues = {
  formLibraryPreference?: FormLibraryPreferenceOption
  whyIsFormikBad?: string
}
const defaultValues: ExampleFieldValues = {
  formLibraryPreference: undefined,
  whyIsFormikBad: undefined,
}
const ExampleForm = () => {
  const { register, handleSubmit, watch, setValue } =
    useForm<ExampleFieldValues>({
      defaultValues,
    })

  const formLibraryPreference = watch('formLibraryPreference')

  const onSubmit: SubmitHandler<ExampleFieldValues> = (data) =>
    console.log(data)

  const { onChange, ...remainingProps } = register('formLibraryPreference')
  const handleFormLibraryPreferenceChange: ChangeEventHandler<
    HTMLInputElement
  > = async (e) => {
    await onChange(e)
    if (e.target.value === 'formik') {
      setValue('whyIsFormikBad', defaultValues.whyIsFormikBad)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Which form Library is better?</legend>
        <div>
          <input
            {...remainingProps}
            id="formLibraryPreference.Formik"
            type="radio"
            value="formik"
            onChange={handleFormLibraryPreferenceChange}
          />
          <label htmlFor="formLibraryPreference.Formik">Formik</label>
        </div>
        <div>
          <input
            {...remainingProps}
            id="formLibraryPreference.reactHookForm"
            type="radio"
            value="reactHookForm"
            onChange={handleFormLibraryPreferenceChange}
          />
          <label htmlFor="formLibraryPreference.Formik">React Hook Form</label>
        </div>
      </fieldset>

      <br />

      {formLibraryPreference && formLibraryPreference !== 'formik' && (
        <>
          <div>
            <label htmlFor="whyIsFormikBad">Why is Formik bad?</label>
            <input {...register('whyIsFormikBad')} />
          </div>
          <br />
        </>
      )}

      <button type="submit">Submit</button>
    </form>
  )
}

const meta = {
  title: 'Example/ReactHookForm',
  component: ExampleForm,
} satisfies Meta<typeof ExampleForm>

export default meta
type Story = StoryObj<typeof ExampleForm>

export const ReactHookForm: Story = {}
