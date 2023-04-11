import {
  Link,
  Identifier,
  IdentifierMasthead,
  IdentifierIdentity,
  IdentifierGov,
  GridContainer,
  IdentifierLinkItem,
  IdentifierLinks,
  IdentifierLink,
  IdentifierLogos,
  IdentifierLogo,
  Icon,
} from '@trussworks/react-uswds'

import { useTranslation } from 'react-i18next'

export const CustomFooter = () => {
  const { t } = useTranslation('components', { keyPrefix: 'footer' })

  return (
    <footer role="contentinfo">
      <GridContainer className="usa-footer__return-to-top">
        <Link href="#">{t('returnTop')}</Link>
      </GridContainer>
      <Identifier>
        <IdentifierMasthead aria-label={t('identifierAria')}>
          <IdentifierLogos>
            <IdentifierLogo href="/">
              {/* TO_DO_YOUR_LOGO_HERE */}
              <Icon.Home className="text-white" size={5} />
            </IdentifierLogo>
          </IdentifierLogos>
          <IdentifierIdentity domain="{TO_DO_YOUR_DOMAIN_HERE}">
            {t('official')}
            <Link href="/">{t('state')}</Link>
          </IdentifierIdentity>
        </IdentifierMasthead>
        <IdentifierLinks navProps={{ 'aria-label': t('links') }}>
          <IdentifierLinkItem key="link1">
            <IdentifierLink href="/">{t('link1')}</IdentifierLink>
          </IdentifierLinkItem>
          <IdentifierLinkItem key="link2">
            <IdentifierLink href="/">{t('link2')}</IdentifierLink>
          </IdentifierLinkItem>
          <IdentifierLinkItem key="link3">
            <IdentifierLink href="/">{t('link3')}</IdentifierLink>
          </IdentifierLinkItem>
          <IdentifierLinkItem key="home">
            <IdentifierLink href="/">{t('home')}</IdentifierLink>
          </IdentifierLinkItem>
        </IdentifierLinks>
        <IdentifierGov aria-label={t('govAria')}>
          {t('copyright')}
        </IdentifierGov>
      </Identifier>
    </footer>
  )
}
