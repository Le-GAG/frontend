const webpack              = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = (config) => {
    // Get Webpack base config
    const webpackConfig = require('./base')(config);

    // Add hot module reload and dev server
    webpackConfig.entry.app.unshift(
        `webpack-dev-server/client?http://${config.devServerHost}:${config.devServerPort}/`,
        'webpack/hot/dev-server'
    );
    webpackConfig.output.publicPath = `http://${config.devServerHost}:${config.devServerPort}/`;
    webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin()
    );

    console.log('Listening on ' + webpackConfig.output.publicPath);

    return webpackConfig;
};
