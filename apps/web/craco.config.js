const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");
const CracoAlias = require("craco-alias");

const packages = [];
packages.push(path.join(__dirname, "../../packages/core/src"));

module.exports = {
    webpack: {
        plugins: [
            {
                plugin: CracoAlias,
                options: {
                    baseUrl: "./src",
                    tsConfigPath: "./tsconfig.extend.json",
                    // aliases: {
                    //     'react-native': 'react-native-web',
                    // }
                },
                apply: (config, options) => {
                    // You can optionally add custom logic here
                    return config;
                }
            }
        ],
        configure: (webpackConfig, arg) => {
            const { isFound, match } = getLoader(webpackConfig, loaderByName("babel-loader"));
            if (isFound) {
                const include = Array.isArray(match.loader.include)
                    ? match.loader.include
                    : [match.loader.include];

                match.loader.include = include.concat(packages);
            }

            return webpackConfig;
        },
    },
};