import {
  DateInput,
  DateInputGroup,
  ErrorMessage,
  Fieldset,
  FormGroup,
} from '@trussworks/react-uswds'
import {
  ChangeEventHandler,
  ComponentProps,
  FocusEventHandler,
  KeyboardEventHandler,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type DateInputOmitProps =
  | 'id'
  | 'name'
  | 'label'
  | 'minLength'
  | 'maxLength'
  | 'unit'
  | 'onBlur'
  | 'readOnly'
  | 'disabled'

type DateInputProps = Omit<ComponentProps<typeof DateInput>, DateInputOmitProps>

type LegendStyle = ComponentProps<typeof Fieldset>['legendStyle']

type DateFieldProps = {
  id?: string
  name: string
  hint?: string
  readOnly?: boolean
  disabled?: boolean
  monthProps?: DateInputProps
  dayProps?: DateInputProps
  yearProps?: DateInputProps
  legend?: ReactNode
  legendStyle?: LegendStyle
}

const MONTH_MAX_LENGTH = 2
const DAY_MAX_LENGTH = 2
const YEAR_MAX_LENGTH = 4
const VALID_KEYS_REGEXP = /[0-9/]+/

export const DateInputField = ({
  id: idProp,
  name,
  hint,
  readOnly,
  disabled,
  monthProps,
  dayProps,
  yearProps,
  legend,
  legendStyle,
}: DateFieldProps) => {
  const { t } = useTranslation('components', { keyPrefix: 'dateInput' })
  const [focused, setFocused] = useState('')
  const { setFocus } = useFormContext()
  const {
    fieldState: { invalid, error },
  } = useController({ name })

  const {
    field: {
      value: monthValue,
      ref: monthRef,
      onBlur: hookFormOnBlurMonth,
      onChange: hookFormOnChangeMonth,
      ...hookFormRemainingPropsMonth
    },
    fieldState: { error: monthError, invalid: monthInvalid },
  } = useController({ name: `${name}.month` })

  const {
    field: {
      value: dayValue,
      ref: dayRef,
      onBlur: hookFormOnBlurDay,
      onChange: hookFormOnChangeDay,
      ...hookFormRemainingPropsDay
    },
    fieldState: { error: dayError, invalid: dayInvalid },
  } = useController({ name: `${name}.day` })

  const {
    field: {
      value: yearValue,
      ref: yearRef,
      onBlur: hookFormOnBlurYear,
      onChange: hookFormOnChangeYear,
      ...hookFormRemainingPropsYear
    },
    fieldState: { error: yearError, invalid: yearInvalid },
  } = useController({ name: `${name}.year` })

  const id = idProp || name

  useEffect(() => {
    // If date is invalid, set focus on first DateInput field.
    if (invalid) setFocus(`${name}.month`)
  }, [setFocus, invalid])

  const showErrorOutlineMonth =
    monthInvalid && focused !== 'month'
      ? 'error'
      : invalid && focused !== 'month'
      ? 'error'
      : undefined
  const showErrorOutlineDay =
    dayInvalid && focused !== 'day'
      ? 'error'
      : invalid && focused !== 'day'
      ? 'error'
      : undefined
  const showErrorOutlineYear =
    yearInvalid && focused !== 'year'
      ? 'error'
      : invalid && focused !== 'year'
      ? 'error'
      : undefined

  const handleChangeMonth: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.target.value !== ''
      ? hookFormOnChangeMonth(e)
      : hookFormOnChangeMonth(undefined)
  }

  const handleChangeDay: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.target.value !== ''
      ? hookFormOnChangeDay(e)
      : hookFormOnChangeDay(undefined)
  }

  const handleChangeYear: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.target.value !== ''
      ? hookFormOnChangeYear(e)
      : hookFormOnChangeYear(undefined)
  }

  const handleBlurMonth: FocusEventHandler<HTMLInputElement> = () => {
    hookFormOnBlurMonth()
    setFocused('')
  }

  const handleBlurDay: FocusEventHandler<HTMLInputElement> = () => {
    hookFormOnBlurDay()
    setFocused('')
  }

  const handleBlurYear: FocusEventHandler<HTMLInputElement> = () => {
    hookFormOnBlurYear()
    setFocused('')
  }

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
    // Only allow numeric entry without the use of `type="number"`
    if (!VALID_KEYS_REGEXP.test(e.key)) {
      e.preventDefault()
    }
  }

  return (
    <FormGroup error={invalid}>
      <Fieldset
        className={'margin-top-0'}
        legend={legend}
        legendStyle={legendStyle}
      >
        {hint && (
          <span className="usa-hint" id={`${id}.hint`}>
            {hint}
          </span>
        )}

        {invalid && <ErrorMessage>{error?.message}</ErrorMessage>}

        {monthInvalid ? (
          <ErrorMessage>{monthError?.message}</ErrorMessage>
        ) : dayInvalid ? (
          <ErrorMessage>{dayError?.message}</ErrorMessage>
        ) : yearInvalid ? (
          <ErrorMessage>{yearError?.message}</ErrorMessage>
        ) : null}

        <DateInputGroup>
          <DateInput
            id={`${id}.month`}
            onFocus={() => setFocused('month')}
            validationStatus={showErrorOutlineMonth}
            onBlur={handleBlurMonth}
            onChange={handleChangeMonth}
            value={monthValue || ''}
            label={t('month')}
            unit={'month'}
            minLength={1}
            maxLength={MONTH_MAX_LENGTH}
            readOnly={readOnly}
            disabled={disabled}
            onKeyPress={handleKeyPress}
            {...monthProps}
            inputRef={monthRef}
            {...hookFormRemainingPropsMonth}
          />
          <DateInput
            id={`${id}.day`}
            onFocus={() => setFocused('day')}
            onBlur={handleBlurDay}
            onChange={handleChangeDay}
            value={dayValue || ''}
            label={t('day')}
            unit={'day'}
            minLength={1}
            maxLength={DAY_MAX_LENGTH}
            validationStatus={showErrorOutlineDay}
            readOnly={readOnly}
            disabled={disabled}
            onKeyPress={handleKeyPress}
            {...dayProps}
            inputRef={dayRef}
            {...hookFormRemainingPropsDay}
          />
          <DateInput
            id={`${id}.year`}
            onFocus={() => setFocused('year')}
            onBlur={handleBlurYear}
            onChange={handleChangeYear}
            value={yearValue || ''}
            label={t('year')}
            unit={'year'}
            minLength={4}
            maxLength={YEAR_MAX_LENGTH}
            validationStatus={showErrorOutlineYear}
            readOnly={readOnly}
            disabled={disabled}
            onKeyPress={handleKeyPress}
            {...yearProps}
            inputRef={yearRef}
            {...hookFormRemainingPropsYear}
          />
        </DateInputGroup>
      </Fieldset>
    </FormGroup>
  )
}
