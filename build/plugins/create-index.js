const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
    return new HtmlWebpackPlugin({
        filename:       'generated-assets-files.json',
        template:       'underscore-template-loader!build/templates/assets-files.json.tpl',
        inject:         false,
        chunksSortMode: 'dependency',
    });
};
