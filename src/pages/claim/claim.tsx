import { Alert, Button } from '@trussworks/react-uswds'
import { PageLayout } from 'components/PageLayout/PageLayout'
import { ReactNode } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { formatDate, formatTimestamp } from 'utils/date'

import styles from './claim.module.scss'

type ClaimStatProps = {
  label: string
  context?: ReactNode
  stat: string
}

const ClaimStat = ({ label, context, stat }: ClaimStatProps) => (
  <>
    <h2 className={styles.mainStatLabel}>{label}</h2>
    {context && <p className="margin-top-0">{context}</p>}
    <span className={styles.mainStat}>{stat}</span>
  </>
)

type AccountUpdate = {
  type: 'submission'
  userID: string
  timestamp: Date
}

type ClaimReviewProps = {
  benefitsPaidAmount: number
  benefitsRemainingAmount: number
  nextPaymentAmount: number
  claimPeriod: [Date, Date]
  accountUpdates: AccountUpdate[]
}

export const ClaimReview = ({
  benefitsPaidAmount,
  benefitsRemainingAmount,
  nextPaymentAmount,
  claimPeriod,
  accountUpdates = [],
}: ClaimReviewProps) => {
  const { t } = useTranslation('pages', { keyPrefix: 'claim' })

  const [claimPeriodFrom, claimPeriodTo] = claimPeriod

  return (
    <PageLayout heading={t('header')}>
      <Alert type="success" headingLevel={'h5'}>
        {t('success')}
      </Alert>
      <div className="margin-y-2">
        <p>{t('reviewText')}</p>
        <p>
          <Trans t={t} i18nKey={'emailFollowUpText'}>
            <a href="/">contact us</a>
          </Trans>
        </p>
      </div>
      <Button type="button">{t('certifyButton')}</Button>
      <div>
        <ClaimStat
          label={t('potentialBenefitsLabel')}
          context={
            <Trans t={t} i18nKey={'paidSoFarText'}>
              {benefitsPaidAmount.toString()}
            </Trans>
          }
          stat={`$${benefitsRemainingAmount}`}
        />
        <ClaimStat
          label={t('potentialNextPaymentLabel')}
          stat={`$${nextPaymentAmount}`}
        />
        <ClaimStat
          label={t('claimPeriodLabel')}
          stat={`${formatDate(claimPeriodFrom)} - ${formatDate(claimPeriodTo)}`}
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