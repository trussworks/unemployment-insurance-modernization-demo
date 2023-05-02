import type { Config } from 'jest'

const config: Config = {
  rootDir: 'src',
  moduleDirectories: ['node_modules', '<rootDir>'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
}

export default config
