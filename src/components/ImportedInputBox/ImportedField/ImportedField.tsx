import { Icon } from '@trussworks/react-uswds'
import classNames from 'classnames'
import { ReactNode } from 'react'

import styles from './ImportedField.module.scss'

type ImportedFieldProps = {
  label: ReactNode
  children: ReactNode
}

export const ImportedField = ({ label, children }: ImportedFieldProps) => (
  <li className={styles.field}>
    <div>{label}</div>
    <div className={classNames(styles.fieldValue, styles.content)}>
      <Icon.Check
        className={classNames(`text-info-dark ${styles.icon}`)}
        aria-hidden="true"
      />
      <div className={typeof children === 'string' ? styles.text : undefined}>
        {children}
      </div>
    </div>
  </li>
)
