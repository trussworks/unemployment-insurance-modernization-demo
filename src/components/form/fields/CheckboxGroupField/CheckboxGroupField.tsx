import {
  Checkbox,
  ErrorMessage,
  Fieldset,
  FormGroup,
} from '@trussworks/react-uswds'
import { ChangeEventHandler, ComponentProps, ReactNode } from 'react'
import { useController } from 'react-hook-form'

import styles from './CheckboxGroupField.module.scss'

type OptionOmitProps = 'id' | 'name' | 'value' | 'label'

type CheckboxOption = {
  value: string
  label: ReactNode
  checkboxProps?: Omit<ComponentProps<typeof Checkbox>, OptionOmitProps>
}

interface ICheckboxGroupFieldProps {
  id?: string
  name: string
  legend?: ReactNode
  options: CheckboxOption[]
}

export const CheckboxGroupField = ({
  id,
  name,
  legend,
  options,
}: ICheckboxGroupFieldProps) => {
  const {
    field: {
      onChange: hookFormOnChange,
      ref,
      value: hookFormValue,
      name: _name,
      ...hookFormRemainingProps
    },
    fieldState: { invalid, error },
  } = useController({ name, defaultValue: [] })

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = [...hookFormValue]
    const valueInArray = newValue.includes(e.target)

    if (e.target.checked && !valueInArray) {
      newValue.push(e.target.value)
    }

    if (!e.target.checked && valueInArray) {
      newValue.filter((value) => value !== e.target.value)
    }

    hookFormOnChange(newValue)
  }
  return (
    <FormGroup error={invalid}>
      <Fieldset
        legend={legend}
        className={`${styles.fieldsetLegend} ${invalid && styles.errorLegend}`}
        onInvalid={(e) => e.preventDefault()}
      >
        {invalid && <ErrorMessage>{error?.message}</ErrorMessage>}

        {options.map((option, index) => (
          <Checkbox
            key={`${id || name}.${index}.${option.value}`}
            id={`${id || name}.${option.value}`}
            name={name}
            label={option.label}
            value={option.value}
            inputRef={ref}
            onChange={handleChange}
            {...option.checkboxProps}
            {...hookFormRemainingProps}
          />
        ))}
      </Fieldset>
    </FormGroup>
  )
}
