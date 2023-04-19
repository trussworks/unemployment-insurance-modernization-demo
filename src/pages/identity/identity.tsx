import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  ButtonGroup,
  Modal,
  ModalFooter,
  ModalHeading,
  ModalOpenLink,
  ModalRef,
  ModalToggleButton,
} from '@trussworks/react-uswds'
import DropdownField from 'components/form/fields/DropdownField/DropdownField'
import { RadioField } from 'components/form/fields/RadioField/RadioField'
import TextField from 'components/form/fields/TextField/TextField'
import { YesNoQuestion } from 'components/form/fields/YesNoQuestion/YesNoQuestion'
import { SectionHeading } from 'components/form/SectionHeading/SectionHeading'
import { ImportedField } from 'components/ImportedInputBox/ImportedField/ImportedField'
import { ImportedInputBox } from 'components/ImportedInputBox/ImportedInputBox'
import { PageLayout } from 'components/PageLayout/PageLayout'
import { countries } from 'countries-list'
import i18n from 'i18n/i18n'
import { ChangeEventHandler, MouseEventHandler, useRef } from 'react'
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { yupSsn } from 'validations/ssn'
import { boolean, object, string } from 'yup'

const tIdentity = i18n.getFixedT(null, 'pages', 'identity')

const workAuthorizationTypeOptions = [
  'usCitizenOrNational',
  'permanentResident',
  'h1bVisa',
  'employmentAuthorizationDocument',
  'notLegallyAllowedToWorkInUS',
] as const
type WorkAuthorizationTypeOption = (typeof workAuthorizationTypeOptions)[number]

const workAuthorizationTypeRadioOptions = workAuthorizationTypeOptions.map(
  (option) => ({
    label: tIdentity(`workAuthorizationType.options.${option}`),
    value: option,
  })
)

const countryOfOriginOptions = Object.entries(countries)
  .sort(([, countryA], [, countryB]) =>
    countryA.name.localeCompare(countryB.name)
  )
  .map(([code, country]) => ({
    label: country.name,
    value: code,
  }))
type CountryOfOriginOption = keyof typeof countries

type IdentityValues = {
  dateOfBirth?: string
  ssn?: string
  hasDriversLicenseOrStateId?: boolean
  driversLicenseOrStateIdNumber?: string
  workAuthorizationType?: WorkAuthorizationTypeOption
  immigrationDocumentFirstName?: string
  immigrationDocumentMiddleInitial?: string
  immigrationDocumentLastName?: string
  hasUscisOrAlienRegistrationNumber?: boolean
  uscisOrAlienRegistrationNumber?: string
  confirmUscisOrAlienRegistrationNumber?: string
  countryOfOrigin?: CountryOfOriginOption
  immigrationDocumentIssueDate?: string
  immigrationDocumentExpirationDate?: string
}

const defaultValues: IdentityValues = {
  dateOfBirth: undefined,
  ssn: undefined,
  hasDriversLicenseOrStateId: undefined,
  driversLicenseOrStateIdNumber: undefined,
  workAuthorizationType: undefined,
  immigrationDocumentFirstName: undefined,
  immigrationDocumentMiddleInitial: undefined,
  immigrationDocumentLastName: undefined,
  hasUscisOrAlienRegistrationNumber: undefined,
  uscisOrAlienRegistrationNumber: undefined,
  confirmUscisOrAlienRegistrationNumber: undefined,
  countryOfOrigin: undefined,
  immigrationDocumentIssueDate: undefined,
  immigrationDocumentExpirationDate: undefined,
}

const validationSchema = object({
  dateOfBirth: string().required(tIdentity('dateOfBirth.errors.required')), // TODO: date
  ssn: yupSsn,
  hasDriversLicenseOrStateId: boolean().required(
    tIdentity('hasDriversLicenseOrStateId.errors.required')
  ),
  driversLicenseOrStateIdNumber: string().when('hasDriversLicenseOrStateId', {
    is: (hasDriversLicenseOrStateId: boolean) => hasDriversLicenseOrStateId,
    then: (schema) =>
      schema.required(
        tIdentity('driversLicenseOrStateIdNumber.errors.required')
      ),
  }),
  workAuthorizationType: string()
    .oneOf([...workAuthorizationTypeOptions])
    .required(tIdentity('workAuthorizationType.errors.required')),
  immigrationDocumentFirstName: string().when('workAuthorizationType', {
    is: (workAuthorizationType: string) =>
      workAuthorizationType && workAuthorizationType !== 'usCitizenOrNational',
    then: (schema) =>
      schema.required(
        tIdentity('immigrationDocumentFirstName.errors.required')
      ),
  }),
  immigrationDocumentMiddleInitial: string().when('workAuthorizationType', {
    is: (workAuthorizationType: string) =>
      workAuthorizationType && workAuthorizationType !== 'usCitizenOrNational',
    then: (schema) =>
      schema.required(
        tIdentity('immigrationDocumentMiddleInitial.errors.required')
      ),
  }),
  immigrationDocumentLastName: string().when('workAuthorizationType', {
    is: (workAuthorizationType: string) =>
      workAuthorizationType && workAuthorizationType !== 'usCitizenOrNational',
    then: (schema) =>
      schema.required(tIdentity('immigrationDocumentLastName.errors.required')),
  }),
  hasUscisOrAlienRegistrationNumber: boolean().when('workAuthorizationType', {
    is: (workAuthorizationType: string) =>
      workAuthorizationType && workAuthorizationType !== 'usCitizenOrNational',
    then: (schema) =>
      schema.required(
        tIdentity('hasUscisOrAlienRegistrationNumber.errors.required')
      ),
  }),
  uscisOrAlienRegistrationNumber: string().when(
    ['workAuthorizationType', 'hasUscisOrAlienRegistrationNumber'],
    {
      is: (
        workAuthorizationType: string,
        hasUscisOrAlienRegistrationNumber: boolean
      ) =>
        workAuthorizationType &&
        workAuthorizationType !== 'usCitizenOrNational' &&
        hasUscisOrAlienRegistrationNumber,
      then: (schema) =>
        schema.required(
          tIdentity('uscisOrAlienRegistrationNumber.errors.required')
        ),
    }
  ),
  confirmUscisOrAlienRegistrationNumber: string().when(
    ['workAuthorizationType', 'hasUscisOrAlienRegistrationNumber'],
    {
      is: (
        workAuthorizationType: string,
        hasUscisOrAlienRegistrationNumber: boolean
      ) =>
        workAuthorizationType &&
        workAuthorizationType !== 'usCitizenOrNational' &&
        hasUscisOrAlienRegistrationNumber,
      then: (schema) =>
        schema.required(
          tIdentity('confirmUscisOrAlienRegistrationNumber.errors.required')
        ),
    }
  ),
  countryOfOrigin: string().when('workAuthorizationType', {
    is: (workAuthorizationType: string) =>
      workAuthorizationType && workAuthorizationType !== 'usCitizenOrNational',
    then: (schema) =>
      schema
        .oneOf([...countryOfOriginOptions.map((option) => option.value)])
        .required(tIdentity('countryOfOrigin.errors.required')),
  }),
  immigrationDocumentIssueDate: string().when('workAuthorizationType', {
    is: (workAuthorizationType: string) =>
      workAuthorizationType && workAuthorizationType !== 'usCitizenOrNational',
    then: (schema) =>
      schema.required(
        tIdentity('immigrationDocumentIssueDate.errors.required')
      ),
  }), // TODO: date
  immigrationDocumentExpirationDate: string().when('workAuthorizationType', {
    is: (workAuthorizationType: string) =>
      workAuthorizationType && workAuthorizationType !== 'usCitizenOrNational',
    then: (schema) =>
      schema.required(
        tIdentity('immigrationDocumentExpirationDate.errors.required')
      ),
  }), // TODO: date
})

type IdentityPageProps = {
  importedDateOfBirth?: string
  importedSsn?: string
}

export const Identity = ({
  importedDateOfBirth, // TODO if not imported, show field
  importedSsn, // TODO if not imported, show field
}: IdentityPageProps) => {
  const { t } = useTranslation('pages', { keyPrefix: 'identity' })

  const hookFormMethods = useForm<IdentityValues>({
    defaultValues: {
      ...defaultValues,
      dateOfBirth: importedDateOfBirth || defaultValues.dateOfBirth,
      ssn: importedSsn || defaultValues.ssn,
    },
    resolver: yupResolver(validationSchema),
  })
  const { handleSubmit, watch, resetField } = hookFormMethods

  const modalRef = useRef<ModalRef>(null)
  const onSubmit: SubmitHandler<IdentityValues> = (data) => {
    console.log(data)
  }

  const onSubmitError: SubmitErrorHandler<IdentityValues> = (errors) => {
    console.log(errors)
  }

  const hasDriversLicenseOrStateId = watch('hasDriversLicenseOrStateId')
  const workAuthorizationType = watch('workAuthorizationType')
  const hasUscisOrAlienRegistrationNumber = watch(
    'hasUscisOrAlienRegistrationNumber'
  )

  const handleHasDriversLicenseOrStateIdChange: ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    if (e.target.value === 'no') {
      resetField('driversLicenseOrStateIdNumber')
    }
  }

  const handleImmigrationHelpLinkClick: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    if (modalRef && modalRef.current) {
      window.open(
        'https://www.immigrationhelp.org/learning-center/what-is-an-alien-registration-number/'
      )
      modalRef.current.toggleModal()
    }
  }

  const handleWorkAuthorizationTypeChange: ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    if (e.target.value === 'usCitizenOrNational') {
      resetField('immigrationDocumentFirstName')
      resetField('immigrationDocumentMiddleInitial')
      resetField('immigrationDocumentLastName')
      resetField('hasUscisOrAlienRegistrationNumber')
      resetField('uscisOrAlienRegistrationNumber')
      resetField('confirmUscisOrAlienRegistrationNumber')
      resetField('countryOfOrigin')
      // TODO resetField('immigrationDocumentIssueDate')
      // TODO resetField('immigrationDocumentExpirationDate')
    }
  }

  const handleHasUscisOrAlienRegistrationNumberChange: ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    if (e.target.value === 'no') {
      resetField('uscisOrAlienRegistrationNumber')
      resetField('confirmUscisOrAlienRegistrationNumber')
    }
  }

  const immigrationHelpModal = (
    <Modal
      ref={modalRef}
      id="alien-registration-number-link-modal"
      aria-labelledby="alien-registration-number-link-modal-heading"
      aria-describedby="alien-registration-number-link-modal-description"
    >
      <ModalHeading id="alien-registration-number-link-modal-heading">
        {t('immigrationHelpModal.heading')}
      </ModalHeading>
      <ModalFooter>
        <ButtonGroup>
          <Button
            type="button"
            name="immigrationHelpLink"
            onClick={handleImmigrationHelpLinkClick}
          >
            {t('immigrationHelpModal.continue')}
          </Button>
          <ModalToggleButton
            modalRef={modalRef}
            closer
            unstyled
            className="padding-105 text-center"
          >
            {t('immigrationHelpModal.cancel')}
          </ModalToggleButton>
        </ButtonGroup>
      </ModalFooter>
    </Modal>
  )

  return (
    <PageLayout heading={t('heading')}>
      <FormProvider {...hookFormMethods}>
        {[importedDateOfBirth, importedSsn].some((imported) => !!imported) && (
          <ImportedInputBox>
            {importedDateOfBirth && (
              <ImportedField label={t('dateOfBirth.label')}>
                {importedDateOfBirth}
              </ImportedField>
            )}
            {importedSsn && (
              <ImportedField label={t('ssn.label')}>
                {importedSsn}
              </ImportedField>
            )}
          </ImportedInputBox>
        )}
        <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
          {immigrationHelpModal}
          {/* TODO: DateOfBirth DateInputField, if not imported */}
          {!importedSsn && (
            <TextField name="ssn" label={t('ssn.label')} type="text" />
          )}
          <YesNoQuestion
            name="hasDriversLicenseOrStateId"
            question={t('hasDriversLicenseOrStateId.label')}
            onChange={handleHasDriversLicenseOrStateIdChange}
          />
          {hasDriversLicenseOrStateId && (
            <TextField
              name="driversLicenseOrStateIdNumber"
              label={t('driversLicenseOrStateIdNumber.label')}
              type="text"
            />
          )}
          <RadioField
            name="workAuthorizationType"
            legend={t('workAuthorizationType.label')}
            options={workAuthorizationTypeRadioOptions}
            onChange={handleWorkAuthorizationTypeChange}
          />

          {workAuthorizationType &&
            workAuthorizationType !== 'usCitizenOrNational' && (
              <>
                <SectionHeading>
                  {t('immigrationDocumentSectionHeading')}
                </SectionHeading>
                <TextField
                  name="immigrationDocumentFirstName"
                  label={t('immigrationDocumentFirstName.label')}
                  type="text"
                />
                <TextField
                  name="immigrationDocumentMiddleInitial"
                  label={t('immigrationDocumentMiddleInitial.label')}
                  type="text"
                />
                <TextField
                  name="immigrationDocumentLastName"
                  label={t('immigrationDocumentLastName.label')}
                  type="text"
                />
                <YesNoQuestion
                  name="hasUscisOrAlienRegistrationNumber"
                  question={t('hasUscisOrAlienRegistrationNumber.label')}
                  hint={
                    <Trans
                      t={t}
                      i18nKey="hasUscisOrAlienRegistrationNumber.hint"
                    >
                      <ModalOpenLink
                        modalRef={modalRef}
                        href="https://www.immigrationhelp.org/learning-center/what-is-an-alien-registration-number/"
                      >
                        Need help finding it?
                      </ModalOpenLink>
                    </Trans>
                  }
                  onChange={handleHasUscisOrAlienRegistrationNumberChange}
                />
                {hasUscisOrAlienRegistrationNumber && (
                  <>
                    <TextField
                      name="uscisOrAlienRegistrationNumber"
                      label={t('uscisOrAlienRegistrationNumber.label')}
                      type="text"
                    />
                    <TextField
                      name="confirmUscisOrAlienRegistrationNumber"
                      label={t('confirmUscisOrAlienRegistrationNumber.label')}
                      type="text"
                    />
                  </>
                )}
                <DropdownField
                  name="countryOfOrigin"
                  label={t('countryOfOrigin.label')}
                  startEmpty
                  options={countryOfOriginOptions}
                />
                {/* TODO Valid from/issued on immigrationDocumentIssueDate */}
                {/* TODO Expiration date immigrationDocumentExpirationDate */}
              </>
            )}

          {/* TODO: FormPaginationButtons */}
          <br />
          <Button type="submit">Next</Button>
        </form>
      </FormProvider>
    </PageLayout>
  )
}
