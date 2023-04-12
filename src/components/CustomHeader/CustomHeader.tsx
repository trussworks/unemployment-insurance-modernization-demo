import { MouseEventHandler, ReactNode, useState } from 'react'
import {
  Header,
  Link,
  NavMenuButton,
  PrimaryNav,
  Title,
} from '@trussworks/react-uswds'
import { useTranslation } from 'react-i18next'

export const CustomHeader = () => {
  const { t } = useTranslation('components', { keyPrefix: 'header' })

  const [expanded, setExpanded] = useState(false)

  const toggleMenu: MouseEventHandler<HTMLElement> = () =>
    setExpanded((previousExpanded) => !previousExpanded)

  const menuItems = [
    <Link key="home" href="#" variant="nav">
      {t('navMenu.items.home')}
    </Link>,
    <Link key="claim" href="#" variant="nav">
      {t('navMenu.items.claim')}
    </Link>,
    <Link key="logOut" href="#" variant="nav">
      {t('navMenu.items.logOut')}
    </Link>,
  ]

  return (
    <Header
      basic={true}
      basicWithMegaMenu={true}
      className="border-bottom border-base-lighter"
    >
      {expanded && (
        <div
          data-testid="overlay"
          className={'usa-overlay is-visible'}
          onClick={toggleMenu}
        />
      )}
      <div className="usa-nav-container">
        <div className="usa-navbar">
          <Title>{t('title')}</Title>
          <NavMenuButton onClick={toggleMenu} label={t('navMenu.button')} />
        </div>
        <PrimaryNav
          items={menuItems}
          mobileExpanded={expanded}
          onToggleMobileNav={toggleMenu}
        ></PrimaryNav>
      </div>
    </Header>
  )
}
