const webpack = require('webpack');
const shell   = require('shelljs');
const chalk   = require('chalk');
const ora     = require('ora');

// Remove deprecation warning
process.noDeprecation = true;

// Get build config
const config = require('./config/build');

// Display spinner
let spinner = ora('Building a development package…');
if (process.env.NODE_ENV && process.env.NODE_ENV == 'production') {
    spinner = ora('Building a production package…');
}
spinner.start();

// Clean static folder
shell.rm('-rf', config.assetsPath);
shell.mkdir('-p', config.assetsPath);
shell.config.silent = true;
shell.cp('-R', 'src/assets/*', config.assetsPath);
shell.config.silent = false;

// Get Webpack configuration
const webpackConfig = require('./webpack/build')(config);

// Get Webpack compiler
const compiler = webpack(webpackConfig);

// Run
compiler.run(function (error, stats) {
    spinner.stop();

    // Show error
    if (error) {
        throw error;
    }

    // Show stats
    process.stdout.write(stats.toString({
            colors:       true,
            modules:      false,
            children:     false,
            chunks:       false,
            chunkModules: false,
        }) + '\n\n');

    // Build complete
    console.log(chalk.cyan('  Build complete.\n'));
});
