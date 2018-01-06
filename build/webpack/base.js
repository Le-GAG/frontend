const utils   = require('../utils/utils');

module.exports = (config) => {
    return {
        entry: {
            babelPolyfill: ['babel-polyfill'],
            app:           ['./src/main.js'],
        },

        output: {
            path:       config.assetsPath,
            publicPath: config.assetsPublicPath,
            filename:   `[name].js?v=${config.versionNumber}`,
        },

        resolve: {
            extensions: ['.js', '.vue', '.json'],
            modules:    [
                utils.resolve('src'),
                utils.resolve('node_modules'),
            ],
            alias:      {
                'vue$':       'vue/dist/vue.common.js',
                'src':        utils.resolve('src'),
                'static':     utils.resolve('src/static'),
                'components': utils.resolve('src/app/components'),
                'pages':      utils.resolve('src/app/pages'),
                'router':     utils.resolve('src/app/router'),
                'services':   utils.resolve('src/app/services'),
                'models':     utils.resolve('src/app/models'),
            },
            symlinks: false, // Without this, module link using NPM link aren't resolved. But beware, it seems they can't be watched for changes.
        },

        module: {
            rules: utils.require('rules', config, [
                'vue',
                'scripts',
                'images',
                'fonts',
            ]),
        },

        plugins: utils.require('plugins', config, [
            'debug',                  // Unless the NODE_ENV environment variable is set to production, set a debug flag that will be passed on to plugins
            'environment-variables',  // Set the Vue.js environment (based on the value of the NODE_ENV environment variable)
            'spritesmith',
            'write-index',
            'create-index',
        ]),
    };
};
