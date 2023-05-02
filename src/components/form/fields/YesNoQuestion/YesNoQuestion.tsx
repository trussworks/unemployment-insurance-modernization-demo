import {
  ErrorMessage,
  Fieldset,
  FormGroup,
  Radio,
} from '@trussworks/react-uswds'
import classnames from 'classnames'
import { ChangeEventHandler, PropsWithChildren, ReactNode } from 'react'
import { useController } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import styles from './YesNoQuestion.module.scss'

interface IYesNoQuestionProps {
  name: string
  question: ReactNode
  hint?: ReactNode
  yesLabel?: string
  noLabel?: string
  isStacked?: boolean
}

export const YES = 'yes'
export const NO = 'no'
export const convertValueToBoolean = (value: string): boolean | undefined => {
  return value === '' ? undefined : value === YES
}
export const YesNoQuestion = ({
  id: idProp,
  name,
  question,
  hint,
  yesLabel,
  noLabel,
  isStacked,
  onChange,
  ...inputProps
}: PropsWithChildren<IYesNoQuestionProps> & JSX.IntrinsicElements['input']) => {
  const { t } = useTranslation('components', { keyPrefix: 'yesNoQuestion' })
  const {
    field: {
      onChange: hookFormOnChange,
      ref,
      value: _,
      ...hookFormRemainingProps
    },
    fieldState: { invalid, error },
  } = useController({ name })

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    hookFormOnChange(convertValueToBoolean(e.target.value))
    if (onChange) {
      onChange(e)
    }
  }

  const id = idProp || name

  return (
    <FormGroup error={invalid}>
      <Fieldset
        legend={question}
        className={classnames(styles.fieldset, {
          [styles.errorLegend]: invalid,
        })}
      >
        {hint && (
          <div className="usa-hint" id={`${id}.hint`} data-testid="yes-no-hint">
            {hint}
          </div>
        )}
        {invalid && <ErrorMessage>{error?.message}</ErrorMessage>}
        <Radio
          key={`${id}.${YES}`}
          id={`${id}.${YES}`}
          label={yesLabel || t('yes')}
          value={YES}
          onChange={handleChange}
          className={isStacked ? styles.stacked : styles.inline}
          inputRef={ref}
          {...hookFormRemainingProps}
          {...inputProps}
        />
        <Radio
          key={`${id}.${NO}`}
          id={`${id}.${NO}`}
          label={noLabel || t('no')}
          value={NO}
          onChange={handleChange}
          className={isStacked ? styles.stacked : styles.inline}
          {...hookFormRemainingProps}
          {...inputProps}
        />
      </Fieldset>
    </FormGroup>
  )
}
