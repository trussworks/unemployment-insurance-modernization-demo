import {
  Dropdown,
  ErrorMessage,
  FormGroup,
  Label,
} from '@trussworks/react-uswds'
import React, { ChangeEventHandler } from 'react'
import { useController } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

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
  ...inputProps
}: IDropdownFieldProps & JSX.IntrinsicElements['select']) => {
  const { t } = useTranslation('common')

  const {
    field: {
      onChange: hookFormOnChange,
      ref,
      value: _,
      ...hookFormRemainingProps
    },
    fieldState: { invalid, error },
  } = useController({ name })

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    hookFormOnChange(e)
    if (onChange) {
      onChange(e)
    }
  }

  const id = idProp || name

  const mapOptions = (options: DropdownOption[]) => {
    return options.map(({ label, value }, index) => (
      <option key={`${index}_${label}_${value}`} value={value}>
        {label}
      </option>
    ))
  }

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

      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Dropdown
        id={id}
        data-testid={id}
        onChange={handleChange}
        inputRef={ref}
        onInvalid={(e) => e.preventDefault()}
        {...inputProps}
        {...hookFormRemainingProps}
      >
        {startEmpty && (
          //this was EMPTY_DROPDOWN_OPTION, do we want to keep that as that was for dealing with formik values
          <option key="empty" value={''}>
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
