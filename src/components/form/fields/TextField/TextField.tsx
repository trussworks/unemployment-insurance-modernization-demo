import {
  ErrorMessage,
  FormGroup,
  InputPrefix,
  InputSuffix,
  Label,
  TextInput,
} from '@trussworks/react-uswds'
import classnames from 'classnames'
import React, {
  ChangeEventHandler,
  FocusEventHandler,
  ReactNode,
  useState,
} from 'react'
import { useController } from 'react-hook-form'

type TextInputProps = Optional<React.ComponentProps<typeof TextInput>, 'id'>

interface ITextFieldProps extends TextInputProps {
  label: ReactNode
  labelClassName?: string
  errorClassName?: string
  labelHint?: string
  hint?: ReactNode
  inputPrefix?: ReactNode
  inputSuffix?: ReactNode
}

export const TextField = ({
  label,
  labelClassName,
  errorClassName,
  labelHint,
  hint,
  inputPrefix,
  inputSuffix,
  onChange,
  onBlur,
  ...textInputProps
}: ITextFieldProps) => {
  const {
    field: {
      onChange: hookFormOnChange,
      onBlur: hookFormOnBlur,
      ref,
      value: textValue,
      ...hookFormRemainingProps
    },
    fieldState: { invalid, error },
  } = useController({ name: textInputProps.name })
  const [focused, setFocused] = useState(false)
  const showErrorOutline = invalid && !focused

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    hookFormOnChange(e)
    if (onChange) {
      onChange(e)
    }
  }
  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    hookFormOnBlur()
    setFocused(false)
    if (onBlur) {
      onBlur(e)
    }
  }

  const textInput = (
    <TextInput
      data-testid={textInputProps.id}
      value={textValue || ''}
      validationStatus={showErrorOutline ? 'error' : undefined}
      onFocus={() => setFocused(true)}
      id={textInputProps.id || textInputProps.name}
      onInvalid={(e) => e.preventDefault()}
      onChange={handleChange}
      onBlur={handleBlur}
      inputRef={ref}
      {...textInputProps}
      {...hookFormRemainingProps}
    />
  )

  return (
    <FormGroup error={invalid}>
      <Label
        className={labelClassName}
        hint={labelHint}
        error={invalid}
        htmlFor={textInputProps.id || textInputProps.name}
      >
        {label}
      </Label>
      {hint && (
        <div
          className="usa-hint"
          id={`${textInputProps.name}-hint`}
          data-testid="text-field-hint"
        >
          {hint}
        </div>
      )}
      {invalid && (
        <ErrorMessage className={errorClassName}>{error?.message}</ErrorMessage>
      )}
      {inputSuffix || inputPrefix ? (
        <div
          className={classnames('usa-input-group', {
            'usa-input-group--error': showErrorOutline,
            'is-focused': focused,
          })}
          data-testid={`${textInputProps.name}-input-group`}
        >
          {inputPrefix && <InputPrefix>{inputPrefix}</InputPrefix>}
          {textInput}
          {inputSuffix && <InputSuffix>{inputSuffix}</InputSuffix>}
        </div>
      ) : (
        textInput
      )}
    </FormGroup>
  )
}

export default TextField
