import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@trussworks/react-uswds'
import TextField from 'components/form/fields/TextField/TextField'
import { PageLayout } from 'components/PageLayout/PageLayout'
import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { getFormattedSsn } from 'utils/format'
import { object, string } from 'yup'

type SSNValues = {
  ssn: string
}
const defaultValues: SSNValues = {
  ssn: '',
}

export const SSN = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'ssn' })

  // TODO move outside component render function
  const schema = object().shape({
    ssn: string()
      .required(t('questions.ssn.errors.required'))
      .matches(
        /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/,
        t('questions.ssn.errors.badFormat')
      )
      .test('ssn', t('questions.ssn.errors.invalid'), (value) =>
        /^(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/.test(
          getFormattedSsn(value)
        )
      ),
  })

  const hookFormMethods = useForm<SSNValues>({
    defaultValues,
    resolver: yupResolver(schema),
  })
  const { handleSubmit } = hookFormMethods

  const [showSsn, setShowSsn] = useState<boolean>(false)
  const handleToggleSsn = () => {
    setShowSsn(!showSsn)
  }
  const onSubmit: SubmitHandler<SSNValues> = (data) => {
    console.log(data)
  }

  return (
    <PageLayout heading={t('heading')}>
      <FormProvider {...hookFormMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="margin-bottom-1">
            <TextField
              label={t('questions.ssn.label')}
              name="ssn"
              type={showSsn ? 'text' : 'password'}
            />
            <div className="text-right maxw-mobile-lg">
              <Button
                unstyled
                className="text-right"
                type="button"
                onClick={handleToggleSsn}
              >
                {showSsn ? t('hideSsn') : t('showSsn')}
              </Button>
            </div>
          </div>
          <Button type="submit">{t('continue')}</Button>
        </form>
      </FormProvider>
    </PageLayout>
  )
}
