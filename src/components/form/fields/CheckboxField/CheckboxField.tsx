import { Checkbox, ErrorMessage, FormGroup } from '@trussworks/react-uswds'
import React, { ChangeEventHandler } from 'react'
import { useController } from 'react-hook-form'

type CheckboxFieldProps = {
  showsErrors?: boolean
  formGroupClassName?: string
}

export const CheckboxField = ({
  name,
  id,
  onChange,
  showsErrors = true,
  formGroupClassName,
  ...inputProps
}: CheckboxFieldProps &
  Optional<React.ComponentProps<typeof Checkbox>, 'id'>) => {
  const {
    field: {
      onChange: hookFormOnChange,
      ref,
      value: _value,
      name: _name,
      ...hookFormRemainingProps
    },
    fieldState: { invalid, error },
  } = useController({ name })

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    hookFormOnChange(e)
    if (onChange) {
      onChange(e)
    }
  }

  return (
    <FormGroup className={formGroupClassName} error={invalid && showsErrors}>
      {invalid && showsErrors && <ErrorMessage>{error?.message}</ErrorMessage>}
      <Checkbox
        name={name}
        id={id || name}
        onChange={handleChange}
        onInvalid={(e) => e.preventDefault()}
        inputRef={ref}
        {...inputProps}
        {...hookFormRemainingProps}
      />
    </FormGroup>
  )
}

export default CheckboxField
