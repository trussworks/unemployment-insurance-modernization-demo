import {
  ChangeEventHandler,
  ComponentProps,
  ReactNode,
  useRef,
  useState,
} from 'react'
import {
  FormGroup,
  ErrorMessage,
  Fieldset,
  Checkbox,
} from '@trussworks/react-uswds'

import CheckboxField from 'components/form/fields/CheckboxField/CheckboxField'

import styles from './CheckboxGroupField.module.scss'
import { useController, useWatch } from 'react-hook-form'

type OptionOmitProps = 'id' | 'name' | 'value' | 'label'

type CheckboxOption = {
  value: string
  label: ReactNode
  checkboxProps?: Omit<ComponentProps<typeof CheckboxField>, OptionOmitProps>
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
      onBlur: hookFormOnBlurIgnored,
      ref,
      value: checkboxGroupValue,
      name: ignoredName,
      ...hookFormRemainingProps
    },
    fieldState: { invalid, error },
  } = useController({ name })
  const valueWatching = useWatch({ name: name })

  const [value, setValue] = useState(checkboxGroupValue || [])
  const stateRef = useRef()
  stateRef.current = value

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const valueCopy = [...value]
    const indexOfValue = valueCopy.indexOf(e.target.value)
    if (e.target.checked && indexOfValue < 0) {
      {
        valueCopy.push(e.target.value)
      }
    } else if (indexOfValue > -1) {
      valueCopy.splice(indexOfValue, 1)
    }

    hookFormOnChange([...valueCopy])

    // update local state
    setValue(valueCopy)
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
          <CheckboxField
            key={`${id || name}.${index}.${option.value}`}
            id={`${id || name}.${option.value}`}
            name={name}
            showsErrors={false}
            formGroupClassName="margin-top-1"
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
