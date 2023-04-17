import {
  Dropdown,
  ErrorMessage,
  FormGroup,
  Label,
} from '@trussworks/react-uswds'
import React, { ChangeEventHandler, FocusEventHandler } from 'react'
import { useController } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const EMPTY_DROPDOWN_OPTION = ''

const mapOptions = (options: DropdownOption[]) => {
  return options.map(({ label, value }, index) => (
    <option key={`${index}_${label}_${value}`} value={value}>
      {label}
    </option>
  ))
}

export type DropdownOption = {
  label: string
  value: string
}

interface IDropdownFieldProps {
  id?: string
  name: string
  formGroupClassName?: string
  label: React.ReactNode
  labelClassName?: string
  labelHint?: string
  options: DropdownOption[] | Record<string, DropdownOption[]>
  startEmpty?: boolean
}

const DropdownField = ({
  name,
  id: idProp,
  formGroupClassName,
  label,
  labelClassName,
  labelHint,
  options,
  startEmpty,
  onChange,
  onBlur,
  ...inputProps
}: IDropdownFieldProps & JSX.IntrinsicElements['select']) => {
  const { t } = useTranslation('components', { keyPrefix: 'dropdownField' })

  const {
    field: {
      onChange: hookFormOnChange,
      onBlur: hookFormOnBlur,
      ref,
      ...hookFormRemainingProps
    },
    fieldState: { invalid, error },
  } = useController({ name })

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    console.log(e)
    hookFormOnChange(e)
    if (onChange) {
      onChange(e)
    }
  }

  const handleBlur: FocusEventHandler<HTMLSelectElement> = (e) => {
    hookFormOnBlur()
    if (onBlur) {
      onBlur(e)
    }
  }

  const id = idProp || name

  return (
    <FormGroup className={formGroupClassName} error={invalid}>
      <Label
        className={labelClassName}
        hint={labelHint}
        error={invalid}
        htmlFor={id}
      >
        {label}
      </Label>
      {invalid && <ErrorMessage>{error?.message}</ErrorMessage>}
      <Dropdown
        id={id}
        data-testid={id}
        onChange={handleChange}
        onBlur={handleBlur}
        inputRef={ref}
        onInvalid={(e) => e.preventDefault()}
        {...inputProps}
        {...hookFormRemainingProps}
      >
        {startEmpty && (
          <option key="empty" value={EMPTY_DROPDOWN_OPTION}>
            {t('select')}
          </option>
        )}
        {Array.isArray(options)
          ? mapOptions(options)
          : Object.entries(options).map(([key, value]) => (
              <optgroup key={`${name}_${key}`} label={key}>
                {mapOptions(value)}
              </optgroup>
            ))}
      </Dropdown>
    </FormGroup>
  )
}

export default DropdownField
