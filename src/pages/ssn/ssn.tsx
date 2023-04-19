import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@trussworks/react-uswds'
import TextField from 'components/form/fields/TextField/TextField'
import { PageLayout } from 'components/PageLayout/PageLayout'
import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupSsn } from 'validations/ssn'
import { object } from 'yup'

type SSNValues = {
  ssn: string
}
const defaultValues: SSNValues = {
  ssn: '',
}

const validationSchema = object({
  ssn: yupSsn,
})

export const SSN = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'ssn' })

  const hookFormMethods = useForm<SSNValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
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
              label={t('ssn.label')}
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
