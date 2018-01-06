/**
 * @author nstCactus
 * @date 06/01/2018 14:33
 */

const MinifyPlugin = require("babel-minify-webpack-plugin");
module.exports = () => {
  return new MinifyPlugin();
};
