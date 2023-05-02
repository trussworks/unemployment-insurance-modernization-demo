import type { Config } from 'jest'

const config: Config = {
  rootDir: 'src',
  collectCoverageFrom: [
    '<rootDir>/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/i18n/**',
    '!**/*.stories.*',
  ],
  coverageDirectory: 'coverage/jest',
  clearMocks: true,
  moduleDirectories: ['node_modules', '<rootDir>'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/i18n/i18n.ts'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
}

export default config
