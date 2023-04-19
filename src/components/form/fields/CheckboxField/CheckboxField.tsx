import { Checkbox, ErrorMessage, FormGroup } from '@trussworks/react-uswds'
import React, { ChangeEventHandler } from 'react'
import { useController } from 'react-hook-form'

export const CheckboxField = ({
  name,
  id,
  onChange,
  ...inputProps
}: Optional<React.ComponentProps<typeof Checkbox>, 'id'>) => {
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
    <FormGroup error={invalid}>
      {invalid && <ErrorMessage>{error?.message}</ErrorMessage>}
      <Checkbox
        name={name}
        id={id || name}
        onChange={handleChange}
        onInvalid={(e) => e.preventDefault()}
        inputRef={ref}
        checked={_value}
        {...inputProps}
        {...hookFormRemainingProps}
      />
    </FormGroup>
  )
}

export default CheckboxField
