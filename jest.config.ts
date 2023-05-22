import type { Config } from 'jest'

const config: Config = {
  rootDir: 'src',
  collectCoverageFrom: [
    '<rootDir>/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/i18n/**',
    '!<rootDir>/types/**',
    '!**/*.stories.*',
    '!<rootDir>/coverage/**',
  ],
  coverageDirectory: 'coverage/jest',
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
  clearMocks: true,
  moduleDirectories: ['node_modules', '<rootDir>'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(png|svg)$': '<rootDir>/__mocks__/imageFileMock.ts',
  },
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/i18n/i18n.ts'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
}

export default config
