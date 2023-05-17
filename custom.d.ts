import { defaultNS, resources } from 'i18n/i18n'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: (typeof resources)['en']
  }
}

declare module '*.png' {
  const content: any
  export default content
}

declare module '*.svg' {
  const content: any
  export default content
}

type Optional<T, K extends keyof T> = Partial<T> & Omit<T, K>

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}
