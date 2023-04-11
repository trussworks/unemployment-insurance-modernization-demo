import type { StorybookConfig } from '@storybook/react-webpack5'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

const path = require('path')

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.plugins = [new TsconfigPathsPlugin()]

    config.module.rules.push({
      test: /\.(sa|sc|c)ss$/,
      exclude: /\.module\.(sa|sc|c)ss$/i,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            sassOptions: {
              includePaths: [
                './node_modules/@uswds',
                './node_modules/@uswds/uswds/packages',
              ],
            },
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    })

    config.module.rules.push({
      test: /\.module\.(sa|sc|c)ss$/i,
      include: path.resolve(__dirname, '../src'),
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
        },
        'sass-loader',
      ],
    })

    return config
  },
}
export default config
