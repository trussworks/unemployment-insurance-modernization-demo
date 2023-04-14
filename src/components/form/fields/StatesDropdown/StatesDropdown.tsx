import DropdownField from 'components/form/fields/DropdownField/DropdownField'
import { statesAndTerritories } from 'fixtures/states_and_territories'
import { ComponentProps } from 'react'

export type StateAbbrev = keyof typeof statesAndTerritories

type DropdownProps = ComponentProps<typeof DropdownField>

type StatesDropdownProps = {
  stateSlice?: StateAbbrev[]
} & Omit<DropdownProps, 'options'>

const allStates = Object.entries(statesAndTerritories).map(([key, value]) => ({
  label: value,
  value: key,
}))

export const StatesDropdown = ({
  label,
  id,
  name,
  startEmpty,
  stateSlice,
  className,
  ...remainingProps
}: StatesDropdownProps) => (
  <DropdownField
    label={label}
    id={id}
    name={name}
    startEmpty={startEmpty}
    options={
      stateSlice
        ? allStates.filter((opt) =>
            stateSlice.includes(opt.value as StateAbbrev)
          )
        : allStates
    }
    className={className}
    {...remainingProps}
  />
)
