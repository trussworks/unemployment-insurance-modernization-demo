import React, {
  ChangeEventHandler,
  FocusEventHandler,
  ReactNode,
  useState,
} from 'react'
import {
  FormGroup,
  Label,
  TextInput,
  ErrorMessage,
  InputPrefix,
  InputSuffix,
} from '@trussworks/react-uswds'
import classnames from 'classnames'

//   import { useFocusFirstError } from 'hooks/useFocusFirstError'
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

// TODO consider from https://github.com/transcom/mymove/tree/master/src/components/Hint
// import Hint from 'components/Hint';

/**
 * This component renders a ReactUSWDS TextInput component inside of a FormGroup,
 * with a Label and ErrorMessage.
 *
 * It relies on the Formik useField hook to work, so it must ALWAYS be rendered
 * inside of a Formik form context.
 *
 * If you want to use these components outside a Formik form, you can use the
 * ReactUSWDS components directly.
 */

export const TextField = ({
  label,
  labelClassName,
  errorClassName,
  labelHint,
  hint,
  inputPrefix,
  inputSuffix,
  onChange,
  ...textInputProps
}: ITextFieldProps) => {
  const {
    field: {
      onChange: hookFormOnChange,
      onBlur: hookFormOnBlur,
      ref,
      value: ignored,
      ...hookFormRemainingProps
    },
    fieldState: { invalid, error },
  } = useController({ name: textInputProps.name })
  const [focused, setFocused] = useState(false)
  const showErrorOutline = invalid && !focused

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    await hookFormOnChange(e)
    if (onChange) {
      onChange(e)
    }
  }
  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(false)
    hookFormOnBlur()
  }

  const textInput = (
    <TextInput
      data-testid={textInputProps.id}
      // value={hookFormRemainingProps.value || ''}
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
      <div className="usa-hint" id={`${textInputProps.name}-hint`}>
        {hint}
      </div>
      {invalid && <ErrorMessage>{error?.message}</ErrorMessage>}
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
