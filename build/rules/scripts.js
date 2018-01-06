const { resolve } = require('../utils/utils');

module.exports = () => {
    return {
        test:    /\.js$/,
        loader:  'babel-loader',
        include: [
            resolve('src'),
            resolve('test'),
            resolve('node_modules/@lahautesociete/'),
        ],
        exclude: [
            // Somehow, Babel breaks MorphSVG plugin (and possibly others).
            // resolve('node_modules/@lahautesociete/gsap-premium'), // Commented as using babel-minify instead of uglify might solve this
        ],
    };
};
