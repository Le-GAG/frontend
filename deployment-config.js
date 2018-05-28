'use strict';

module.exports = function () {
  return {
    // Common configuration
    // These options will be merged with those specific to the environment
    common: {
      localPath: 'www',
      exclude:   [
        'www/app/user-config/**',
        'www/app/tmp/**',
        'www/app/logs/**',
      ],
    },

    // Environment specific configuration
    environments: {
      production: require('./environments/production.js'),
    },
  };
};
