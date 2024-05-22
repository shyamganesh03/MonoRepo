const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco');
const CracoAlias = require('craco-alias');

const packages = [];
packages.push(path.join(__dirname, '../../packages/core/src'));

module.exports = {
  webpack: {
    plugins: [
      {
        plugin: CracoAlias,
        options: {
          baseUrl: './src',
          tsConfigPath: './tsconfig.json',
        },
        apply: (config) => {
          return config;
        },
      },
    ],
    configure: (webpackConfig) => {
      let currentWebpackConfig = webpackConfig;
      currentWebpackConfig = {
        ...currentWebpackConfig,
        resolve: {
          ...currentWebpackConfig.resolve,
          alias: {
            ...currentWebpackConfig.resolve.alias,
            '@sentry/react-native': '@sentry/react',
          },
        },
      };

      const { isFound, match } = getLoader(currentWebpackConfig, loaderByName('babel-loader'));
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];

        match.loader.include = include.concat(packages);
      }

      return currentWebpackConfig;
    },
  },
};
