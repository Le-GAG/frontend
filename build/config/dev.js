const merge      = require('webpack-merge');
const baseConfig = require('./base');
const getLocalIp = require('local-ipv4-address');

process.env.WEBPACK_DEV_SERVER = true;

module.exports = (callback) => {
    getLocalIp().then((ipAddress) => {
        const config = merge(baseConfig, {
            env:           'dev',
            devServerPort: 45978,
            devServerHost: ipAddress || 'localhost',
        });

        callback(config);
    });
};
