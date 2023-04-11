import React, { ChangeEventHandler } from 'react'
import { Checkbox, ErrorMessage, FormGroup } from '@trussworks/react-uswds'
import { useController } from 'react-hook-form'
/**
 * This component renders a checkbox
 *
 * It relies on the Formik useField hook to work, so it must ALWAYS be rendered
 * inside of a Formik form context.
 *
 * If you want to use these components outside a Formik form, you can use the
 * ReactUSWDS components directly.
 */

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
      value: ignored,
      name: ignoredName,
      ...hookFormRemainingProps
    },
    fieldState: { invalid, error },
  } = useController({ name })

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    await hookFormOnChange(e)
    if (onChange) {
      onChange(e)
    }
  }

  /* eslint-disable-next-line react/jsx-props-no-spreading */
  return (
    <FormGroup className={formGroupClassName} error={invalid}>
      {invalid && <ErrorMessage>{error?.message}</ErrorMessage>}
      <Checkbox
        name={name}
        id={id || name}
        onChange={handleChange}
        onInvalid={(e) => e.preventDefault()}
        {...inputProps}
        {...hookFormRemainingProps}
      />
    </FormGroup>
  )
}

export default CheckboxField
