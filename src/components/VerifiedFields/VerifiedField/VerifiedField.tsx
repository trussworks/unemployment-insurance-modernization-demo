import { Icon } from '@trussworks/react-uswds'
import classNames from 'classnames'
import { ReactNode } from 'react'

import styles from './VerifiedField.module.scss'

type VerifiedFieldProps = {
  label: ReactNode
  children: ReactNode
}

export const VerifiedField = ({ label, children }: VerifiedFieldProps) => (
  <li className={styles.field}>
    <div>{label}</div>
    <div
      className={classNames(styles.fieldValue, {
        [styles.withChildren]: children,
      })}
    >
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
