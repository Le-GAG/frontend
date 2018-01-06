const webpack = require('webpack');

module.exports = () => {
    return new webpack.LoaderOptionsPlugin({
        debug: !(process.env.NODE_ENV && process.env.NODE_ENV == 'production'),
    });
};
