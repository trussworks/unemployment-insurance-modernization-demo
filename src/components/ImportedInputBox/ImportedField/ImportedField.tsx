import { Icon } from '@trussworks/react-uswds'
import classNames from 'classnames'
import styles from 'components/ImportedInputBox/ImportedField/ImportedField.module.scss'
import { ReactNode } from 'react'

type VerifiedFieldProps = {
  label: ReactNode
  children: ReactNode
}

export const ImportedField = ({ label, children }: VerifiedFieldProps) => (
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
