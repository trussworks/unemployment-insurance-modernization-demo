import {
  Radio,
  FormGroup,
  ErrorMessage,
  Fieldset,
} from '@trussworks/react-uswds'
import {
  ChangeEventHandler,
  ComponentProps,
  FocusEventHandler,
  ReactNode,
} from 'react'

import styles from './RadioField.module.scss'

import { useController, useFormContext } from 'react-hook-form'

interface IRadioOption {
  label: ReactNode
  value: string
  labelDescription?: string
}

type RadioInputProps = Optional<
  Omit<ComponentProps<typeof Radio>, 'label' | 'value'>,
  'id'
>

interface IRadioFieldProps extends RadioInputProps {
  options: IRadioOption[]
  errorMessage?: string
  legend?: ReactNode
  fieldsetClassName?: string
  hint?: ReactNode
}

export const RadioField = ({
  id: idProp,
  name,
  options,
  onChange,
  onBlur,
  legend,
  fieldsetClassName,
  hint,
  ...inputProps
}: IRadioFieldProps & JSX.IntrinsicElements['input']) => {
  const {
    field: {
      onChange: hookFormOnChange,
      onBlur: hookFormOnBlur,
      ref,
      value: ignored,
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

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    hookFormOnBlur()
    if (onBlur) {
      onBlur(e)
    }
  }

  const id = idProp || name

  return (
    <FormGroup error={invalid}>
      <Fieldset
        legend={legend}
        className={`${fieldsetClassName} ${styles.fieldsetLegend} ${
          invalid && styles.errorLegend
        }`}
        onInvalid={(e) => e.preventDefault()}
      >
        {hint && (
          <span className="usa-hint" id={`${name}.hint`}>
            {hint}
          </span>
        )}
        {invalid && <ErrorMessage>{error?.message}</ErrorMessage>}
        {options.map((option, index) => (
          <Radio
            key={`${id}.${index}.${option.value}`}
            id={`${id}.${option.value}`}
            data-testid={`${id}.${option.value}`}
            label={option.label}
            labelDescription={option?.labelDescription}
            value={option.value}
            onChange={handleChange}
            onBlur={handleBlur}
            inputRef={ref}
            {...inputProps}
            {...hookFormRemainingProps}
          />
        ))}
      </Fieldset>
    </FormGroup>
  )
}
