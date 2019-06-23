'use strict';

module.exports = function () {
  return {
    // Common configuration
    // These options will be merged with those specific to the environment
    common: {
      mode:      'synchronize',
      localPath: 'dist',
    },

    // Environment specific configuration
    environments: {
      preproduction: require('./environments/preproduction.js'),
    },
  };
};
