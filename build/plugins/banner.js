const webpack = require('webpack');

module.exports = (config) => {
    let banner = [
        `Version: ${config.versionNumber}`,
        `Commit:  ${config.commitHash}`,
        `Date:    ${new Date().toString()}`,
    ].join('\n');

    return new webpack.BannerPlugin(banner);
};
