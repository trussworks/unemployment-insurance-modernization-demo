import { ComponentProps, ReactNode, useRef, useState } from 'react'
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
  console.log('CheckboxGroupField value is ', checkboxGroupValue)
  console.log(options)
  const valueWatching = useWatch({ name: name })
  console.log(
    'remiaing hook form props are ' +
      JSON.stringify({ ...hookFormRemainingProps })
  )
  const [value, setValue] = useState(checkboxGroupValue || [])
  const stateRef = useRef()
  stateRef.current = value

  return (
    <FormGroup error={invalid}>
      <Fieldset
        legend={legend}
        className={`${styles.fieldsetLegend} ${invalid && styles.errorLegend}`}
        onInvalid={(e) => e.preventDefault()}
        onChange={(e) => {
          console.log(
            'a change occured and the value stored is now ' + checkboxGroupValue
          )
          console.log('value watched is ' + valueWatching)
        }}
      >
        {invalid && <ErrorMessage>{error?.message}</ErrorMessage>}

        {options.map((option, index) => (
          //      <label>
          //      <input
          //        name={name}
          //        type="checkbox"
          //        value={option.value}
          //        onChange={(e) => {
          //         const valueCopy = [...value];
          //         console.log("value copy is "+valueCopy)
          //         // update checkbox value
          //         console.log(" copy at index will be "+e.target.checked ? e.target.value : null)
          //         valueCopy[index] = e.target.checked ? e.target.value : null

          //         // send data to react hook form
          //         hookFormOnChange(valueCopy);

          //         // update local state
          //         setValue(valueCopy);
          //         console.log("value is now "+valueCopy)
          //         console.log("value stored is "+stateRef.current)
          //       }}
          //        ref={ref}
          //      />{option.label}
          //    </label>

          <Checkbox
            name={name}
            id={`${id || name}.${option.value}`}
            label={option.label}
            value={option.value}
            className="margin-top-1"
            onChange={(e) => {
              const valueCopy = [...value]
              console.log('value copy is ' + valueCopy)
              // update checkbox value
              console.log(
                ' copy at index will be ' + e.target.checked
                  ? e.target.value
                  : null
              )
              valueCopy[index] = e.target.checked ? e.target.value : null

              // send data to react hook form
              hookFormOnChange(valueCopy)

              // update local state
              setValue(valueCopy)
              console.log('value is now ' + valueCopy)
              console.log('value stored is ' + stateRef.current)
            }}
            onInvalid={(e) => e.preventDefault()}
            inputRef={ref}
            {...option.checkboxProps}
            {...hookFormRemainingProps}
          />
          //   <CheckboxField

          //     key={`${id || name}.${index}.${option.value}`}
          //     id={`${id || name}.${option.value}`}
          //     name={name}
          //     showsErrors={false}
          //     formGroupClassName="margin-top-1"
          //     label={option.label}
          //     value={option.value}
          //     // checked={value.includes(option.value)}
          //     inputRef={ref}
          //     onChange={(e) => {
          //                 const valueCopy = [...value];
          //                 console.log("value copy is "+valueCopy)
          //                 // update checkbox value
          //                 console.log(" copy at index will be "+e.target.checked ? e.target.value : null)
          //                 valueCopy[index] = e.target.checked ? e.target.value : null

          //                 // send data to react hook form
          //                 hookFormOnChange(valueCopy);

          //                 // update local state
          //                 setValue(valueCopy);
          //                 console.log("value is now "+valueCopy)
          //                 console.log("value stored is "+stateRef.current)
          //               }}
          //     {...option.checkboxProps}
          //     {...hookFormRemainingProps}

          //   />
        ))}
      </Fieldset>
    </FormGroup>
  )
}
