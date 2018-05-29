const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
      },
    },
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|fr/),
    ],
  },

  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },
};
