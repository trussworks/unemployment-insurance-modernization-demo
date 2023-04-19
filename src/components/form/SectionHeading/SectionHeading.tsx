import { HeadingLevel } from '@trussworks/react-uswds'
import classnames from 'classnames'
import { ReactNode } from 'react'

type SectionHeadingProps = {
  headingLevel?: HeadingLevel
  className?: string
  children: ReactNode
}

export const SectionHeading = ({
  headingLevel = 'h2',
  className,
  children,
}: SectionHeadingProps) => {
  const classes = classnames('font-heading-sm margin-top-4', className)
  const Heading = headingLevel

  return <Heading className={classes}>{children}</Heading>
}
