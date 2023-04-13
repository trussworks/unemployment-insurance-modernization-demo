import {
  SummaryBox,
  SummaryBoxContent,
  SummaryBoxHeading,
} from '@trussworks/react-uswds'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './VerifiedFields.module.scss'

type VerifiedFieldsProps = {
  children: ReactNode
}

export const VerifiedFields = ({ children }: VerifiedFieldsProps) => {
  const { t } = useTranslation('components', { keyPrefix: 'verifiedFields' })

  return (
    <SummaryBox className="margin-bottom-4">
      <SummaryBoxHeading headingLevel="h2">{t('heading')}</SummaryBoxHeading>
      <SummaryBoxContent>
        <ul className={styles.fieldList}>{children}</ul>
      </SummaryBoxContent>
    </SummaryBox>
  )
}
