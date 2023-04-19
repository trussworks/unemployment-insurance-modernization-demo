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

  const convertValueToBoolean = (value: string): boolean | undefined => {
    return value === '' ? undefined : value === 'yes'
  }

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
        onInvalid={(e) => e.preventDefault()}
      >
        {hint && (
          <div className="usa-hint" id={`${id || name}.hint`}>
            {hint}
          </div>
        )}
        {invalid && <ErrorMessage>{error?.message}</ErrorMessage>}
        <Radio
          key={`${id}.yes`}
          id={`${id}.yes`}
          data-testid={`${id}.yes`}
          label={yesLabel || t('yes')}
          value="yes"
          onChange={handleChange}
          className={isStacked ? styles.stacked : styles.inline}
          inputRef={ref}
          {...hookFormRemainingProps}
          {...inputProps}
        />
        <Radio
          key={`${id}.no`}
          id={`${id}.no`}
          data-testid={`${id}.no`}
          label={noLabel || t('no')}
          value="no"
          onChange={handleChange}
          className={isStacked ? styles.stacked : styles.inline}
          {...hookFormRemainingProps}
          {...inputProps}
        />
      </Fieldset>
    </FormGroup>
  )
}
