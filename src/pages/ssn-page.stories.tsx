import { Meta, StoryObj } from '@storybook/react'
import { Button, ErrorMessage, Label, TextInput } from '@trussworks/react-uswds'
import { PageLayout } from 'components/PageLayout/PageLayout'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

type SSNValues = {
  ssn: string
}
const defaultValues: SSNValues = {
  ssn: '',
}

const SSNInput = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'ssn' })

  const schema = object().shape({
    ssn: string()
      .matches(/^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/, t('errors.badFormat'))
      .required(t('errors.required'))
      // TODO: add validation from ss guidance
      // https://secure.ssa.gov/poms.nsf/lnx/0110201035
      // regex: https://uibakery.io/regex-library/ssn
      .test('ssn', t('errors.invalid'), (value) =>
        value
          ? /^(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/.test(value)
          : false
      ),
  })

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<SSNValues>({
    defaultValues,
    resolver: yupResolver(schema),
  })

  const [showSsn, setShowSsn] = useState<boolean>(false)
  const handleToggleSsn = () => {
    setShowSsn(!showSsn)
  }
  const onSubmit: SubmitHandler<SSNValues> = (data) => console.log(data)

  return (
    <PageLayout heading={t('header')}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="margin-bottom-1">
          {/* TODO: replace with new TextField component */}
          <Label htmlFor="ssn">{t('label')}</Label>
          <ErrorMessage>{errors.ssn?.message}</ErrorMessage>
          <TextInput
            id="ssn"
            name="ssn"
            type={showSsn ? 'text' : 'password'}
            maxLength={11}
            minLength={9}
          />
          {/* end TODO */}
          <div className="text-right maxw-mobile-lg">
            <button
              className="usa-button usa-button--unstyled text-right"
              type="button"
              data-testid="toggleShowNumber"
              onClick={handleToggleSsn}
            >
              {showSsn ? t('hideSsn') : t('showSsn')}
            </button>
          </div>
        </div>
        <Button type="submit">{t('continue')}</Button>
      </form>
    </PageLayout>
  )
}

const meta = {
  title: 'Pages/SSN',
  component: SSNInput,
} satisfies Meta<typeof SSNInput>

export default meta
type Story = StoryObj<typeof SSNInput>

export const SSN: Story = {}
