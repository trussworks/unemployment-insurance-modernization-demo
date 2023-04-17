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
      value: hookFormValue = [],
      name: _name,
      ...hookFormRemainingProps
    },
    fieldState: { invalid, error },
  } = useController({ name }) //defaultValue: []

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(
      'onchange hookform value is  ' +
        hookFormValue +
        ' u clicked ' +
        e.target.value
    )
    const newValue = [...hookFormValue]
    const valueInArray = newValue.includes(e.target.value)

    console.log(valueInArray)
    if (!valueInArray) {
      console.log('add item')
      newValue.push(e.target.value)
    }

    if (valueInArray) {
      console.log('remove the value')
      newValue.filter((value) => value !== e.target.value)
      // console.log
      // e.target.checked=false
      console.log(
        'target is checked' +
          e.target.checked +
          '  hookform value is ' +
          newValue
      )
    }

    hookFormOnChange(newValue)
    console.log('new value was ' + newValue)
    console.log('hookformvalue is currently holding ' + hookFormValue)
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
            checked={
              hookFormValue ? hookFormValue.includes(option.value) : false
            }
            {...option.checkboxProps}
            {...hookFormRemainingProps}
          />
        ))}
      </Fieldset>
    </FormGroup>
  )
}
