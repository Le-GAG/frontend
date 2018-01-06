const ExtractTextPlugin = require('extract-text-webpack-plugin');
const utils             = require('../utils/utils');

module.exports = (config) => {
    // Get Webpack base config
    const webpackConfig = require('./base')(config);

    webpackConfig.plugins.push(
        new ExtractTextPlugin(`style.css?v=${config.versionNumber}`) // Extract CSS into file
    );

    webpackConfig.plugins = webpackConfig.plugins.concat(
        utils.require('plugins', config, [
            'css-optimize', // CSS optimizer/minifier
            'minify-js',
            'banner',       // Add a comment at the beginning of output files
        ])
    );

    return webpackConfig;
};
