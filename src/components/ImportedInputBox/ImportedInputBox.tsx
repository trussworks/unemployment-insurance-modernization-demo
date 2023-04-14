import {
  SummaryBox,
  SummaryBoxContent,
  SummaryBoxHeading,
} from '@trussworks/react-uswds'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './ImportedInputBox.module.scss'

type ImportedInputBoxProps = {
  children: ReactNode
}

export const ImportedInputBox = ({ children }: ImportedInputBoxProps) => {
  const { t } = useTranslation('components', { keyPrefix: 'importedInputBox' })

  return (
    <SummaryBox className="margin-bottom-4">
      <SummaryBoxHeading headingLevel="h2">{t('heading')}</SummaryBoxHeading>
      <SummaryBoxContent>
        <ul className={styles.fieldList}>{children}</ul>
      </SummaryBoxContent>
    </SummaryBox>
  )
}
