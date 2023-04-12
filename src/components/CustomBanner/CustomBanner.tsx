import { ReactNode, useState } from 'react'
import {
  Banner,
  BannerButton,
  BannerContent,
  BannerFlag,
  BannerGuidance,
  BannerHeader,
  BannerIcon,
  BannerLockImage,
  MediaBlockBody,
} from '@trussworks/react-uswds'
import { Trans, useTranslation } from 'react-i18next'

import flagImg from '@uswds/uswds/src/img/us_flag_small.png'
import dotGovIcon from '@uswds/uswds/src/img/icon-dot-gov.svg'
import httpsIcon from '@uswds/uswds/src/img/icon-https.svg'

export const CustomBanner = () => {
  const { t } = useTranslation('components', { keyPrefix: 'banner' })

  const [isOpen, setIsOpen] = useState(false)

  const dotGovAlt = t('content.dotGov.icon.alt')
  const httpsAlt = t('content.https.icon.alt')
  const lock = (
    <BannerLockImage
      title={t('content.https.lockIcon.title')}
      description={t('content.https.lockIcon.description')}
    />
  )

  return (
    <Banner>
      <BannerHeader
        isOpen={isOpen}
        flagImg={
          <BannerFlag
            src={flagImg}
            alt={t('header.flagImg.alt') || undefined}
          />
        }
        headerText={t('header.text')}
        headerActionText={t('header.actionText')}
      >
        <BannerButton
          isOpen={isOpen}
          aria-controls="custom-banner"
          onClick={(): void => {
            setIsOpen((previousIsOpen) => !previousIsOpen)
          }}
        >
          {t('header.actionText')}
        </BannerButton>
      </BannerHeader>
      <BannerContent id="custom-banner" isOpen={isOpen}>
        <div className="grid-row grid-gap-lg">
          <BannerGuidance className="tablet:grid-col-6">
            <BannerIcon src={dotGovIcon} alt={dotGovAlt} />
            <MediaBlockBody>
              <p>
                <strong>{t('content.dotGov.explanation.title')}</strong>
                <br />
                <Trans t={t} i18nKey="content.dotGov.explanation.text" />
              </p>
            </MediaBlockBody>
          </BannerGuidance>
          <BannerGuidance className="tablet:grid-col-6">
            <BannerIcon src={httpsIcon} alt={httpsAlt} />
            <MediaBlockBody>
              <p>
                <strong>{t('content.https.explanation.title')}</strong>
                <br />
                <Trans
                  t={t}
                  i18nKey="content.https.explanation.text"
                  components={[lock]}
                />
              </p>
            </MediaBlockBody>
          </BannerGuidance>
        </div>
      </BannerContent>
    </Banner>
  )
}
