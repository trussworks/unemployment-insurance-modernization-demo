import {
  SummaryBox,
  SummaryBoxContent,
  SummaryBoxHeading,
} from '@trussworks/react-uswds'
import styles from 'components/ImportedInputBox/ImportedInputBox.module.scss'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

type VerifiedFieldsProps = {
  children: ReactNode
}

export const ImportedInputBox = ({ children }: VerifiedFieldsProps) => {
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
