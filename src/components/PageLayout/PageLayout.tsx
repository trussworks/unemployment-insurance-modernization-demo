import { CustomBanner } from 'components/CustomBanner/CustomBanner'
import { CustomFooter } from 'components/CustomFooter/CustomFooter'
import { CustomHeader } from 'components/CustomHeader/CustomHeader'
import { ReactNode } from 'react'

type PageLayoutProps = {
  heading: string
  children: ReactNode
}

export const PageLayout = ({ heading, children }: PageLayoutProps) => {
  return (
    <div>
      <main>
        <CustomBanner />
        <CustomHeader />
        <div className="grid-container">
          <h1>{heading}</h1>
          {children}
        </div>
        <CustomFooter />
      </main>
    </div>
  )
}
