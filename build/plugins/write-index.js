const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = () => {
    return new WriteFilePlugin({
        test:  /generated-assets-files\.json$/,
        force: true,
        log:   false,
    });
};
