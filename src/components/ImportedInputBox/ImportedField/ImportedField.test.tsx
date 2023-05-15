import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'

import { ImportedField } from './ImportedField'

const DATE_OF_BIRTH_LABEL = 'Date of birth'
const IMPORTED_DATE_OF_BIRTH = '1/2/2003'

describe('ImportedField', () => {
  const renderImportedField = (label: string, children?: ReactNode) => {
    render(
      <ImportedField label={label}>
        {children ? children : IMPORTED_DATE_OF_BIRTH}
      </ImportedField>
    )

    const listItem = screen.getByRole('listitem')

    return {
      listItem,
    }
  }

  it('Renders without error', () => {
    const { listItem } = renderImportedField(DATE_OF_BIRTH_LABEL)

    expect(listItem).toBeInTheDocument()
    expect(listItem).toHaveTextContent(
      `${DATE_OF_BIRTH_LABEL}${IMPORTED_DATE_OF_BIRTH}`
    )
  })

  it('Renders with React child', () => {
    const customImportedDateOfBirth = <strong>{'12/5/1990'}</strong>
    const { listItem } = renderImportedField(
      DATE_OF_BIRTH_LABEL,
      customImportedDateOfBirth
    )

    expect(listItem).toBeInTheDocument()
    expect(listItem).toHaveTextContent(`${DATE_OF_BIRTH_LABEL}12/5/1990`)
  })
})
