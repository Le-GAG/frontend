module.exports = (config) => {
    return {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use:  [
            {
                loader:  'url-loader',
                options: {
                    limit: 100,
                    name:  `images/[name].[ext]?v=${config.versionNumber}`,
                },
            },
            {
                loader:  'image-webpack-loader',
                options: {
                    bypassOnDebug: true,

                    svgo: {
                        enabled: false,
                    },

                    gifsicle: {
                        enabled: false,
                    },

                    mozjpeg: {
                        enabled: !(process.env.NODE_ENV && process.env.NODE_ENV == 'production'),
                        quality: 90,
                    },
                    //
                    // // Attention, pngquant = perte de qualité
                    // pngquant: {
                    //     enabled: true,
                    //     quality: '90-100',
                    //     speed: 3
                    // },

                    // optipng, sans pertes.
                    optipng: {
                        enabled:           !(process.env.NODE_ENV && process.env.NODE_ENV == 'production'),
                        optimizationLevel: 7,
                        interlaced:        false,
                    },
                },
            },
        ],
    };
};
