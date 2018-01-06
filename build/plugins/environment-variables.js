const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');

const environmentName = process.env.NODE_ENV || 'nstcactus';
const envPath = path.join(
  __dirname,
  '..',
  '..',
  'environments',
  `${environmentName}.env`
);
dotenv.config({path: envPath});

module.exports = () => {
  let variablesToReplace = {
    'process.env': {
      NODE_ENV:           JSON.stringify(process.env.NODE_ENV),
      WEBPACK_DEV_SERVER: process.env.WEBPACK_DEV_SERVER,
      BACKEND_ENDPOINT:   `"${process.env.BACKEND_ENDPOINT}"`,
    }
  };

  return new webpack.DefinePlugin(variablesToReplace);
};
