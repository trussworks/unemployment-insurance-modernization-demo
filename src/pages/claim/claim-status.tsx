import { Alert, Button } from '@trussworks/react-uswds'
import { PageLayout } from 'components/PageLayout/PageLayout'
import { ReactNode } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { formatDate, formatTimestamp } from 'utils/date'

import styles from './claim-status.module.scss'

type ClaimStatusFigureProps = {
  header: string
  context?: ReactNode
  stat: string
}

const ClaimStatusFigure = ({
  header,
  context,
  stat,
}: ClaimStatusFigureProps) => (
  <>
    <h2 className={styles.mainStatLabel}>{header}</h2>
    {context && <p className="margin-top-0">{context}</p>}
    <span className={styles.mainStat}>{stat}</span>
  </>
)

type AccountUpdate = {
  type: 'submission'
  userID: string
  timestamp: Date
}

export type ClaimStatusProps = {
  benefitsPaidAmount: number
  benefitsRemainingAmount: number
  nextPaymentAmount: number
  claimPeriodFrom: Date
  claimPeriodTo?: Date
  accountUpdates: AccountUpdate[]
}

export const ClaimStatus = ({
  benefitsPaidAmount,
  benefitsRemainingAmount,
  nextPaymentAmount,
  claimPeriodFrom,
  claimPeriodTo,
  accountUpdates = [],
}: ClaimStatusProps) => {
  const { t } = useTranslation('pages', { keyPrefix: 'claimStatus' })
  return (
    <PageLayout heading={t('header')}>
      <Alert type="success" headingLevel={'h5'}>
        {t('success')}
      </Alert>
      <div className="margin-y-2">
        <p>{t('review')}</p>
        <p>{t('certify')}</p>
      </div>
      <Button type="button">{t('certifyButton')}</Button>
      <div>
        <ClaimStatusFigure
          header={t('potentialBenefits.header')}
          context={
            <Trans t={t} i18nKey={'potentialBenefits.context'}>
              {benefitsPaidAmount.toString()}
            </Trans>
          }
          stat={`$${benefitsRemainingAmount}`}
        />
        <ClaimStatusFigure
          header={t('potentialNextPayment.header')}
          stat={`$${nextPaymentAmount}`}
        />
        <ClaimStatusFigure
          header={t('claimPeriod.header')}
          stat={`${formatDate(claimPeriodFrom)} - ${
            claimPeriodTo ? formatDate(claimPeriodTo) : 'TBD'
          }`}
        />
        <h2 className="font-heading-2xl margin-bottom-0">Recent activity</h2>
        <ul>
          {accountUpdates.length > 0 &&
            accountUpdates.map((update, index) => (
              <li key={index}>
                <Trans t={t} i18nKey={`accountUpdate.${update.type}`}>
                  {update.userID}
                </Trans>
                <span className="text-base display-block">
                  {formatTimestamp(update.timestamp)}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </PageLayout>
  )
}
