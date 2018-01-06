const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = () => {
    return new OptimizeCSSPlugin({
        cssProcessorOptions: {
            discardComments: { removeAll: true },
            reduceIdents:    false  // Sinon les keyframes sont renommées. https://github.com/ben-eb/cssnano/issues/317 http://cssnano.co/optimisations/reduceIdents/
        },
    });
};
