import { render, screen } from '@testing-library/react'

import { ImportedField } from './ImportedField/ImportedField'
import { ImportedInputBox } from './ImportedInputBox'

const IMPORTED_HEADING =
  'The following information has been added to your application:'
const DATE_OF_BIRTH_LABEL = 'Date of birth'
const IMPORTED_DATE_OF_BIRTH = '1/2/2003'

describe('ImportedInputBox', () => {
  const renderImportedInputBox = () => {
    render(
      <ImportedInputBox>
        <ImportedField label={DATE_OF_BIRTH_LABEL}>
          {IMPORTED_DATE_OF_BIRTH}
        </ImportedField>
      </ImportedInputBox>
    )

    const importedHeading = screen.getByRole('heading', {
      name: IMPORTED_HEADING,
    })
    const importedList = screen.getByRole('list')

    return {
      importedHeading,
      importedList,
    }
  }

  it('Renders without error', () => {
    const { importedHeading, importedList } = renderImportedInputBox()

    expect(importedHeading).toBeInTheDocument()
    expect(importedHeading).toHaveTextContent(IMPORTED_HEADING)
    expect(importedList).toBeInTheDocument()
  })
})
