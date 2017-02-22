// Must be set at the very beginning so that Webpack knows
// it needs to create an optimized production bundle
process.env.NODE_ENV = 'production';

const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config/webpack-prod');
const {
  checkRequiredFiles,
  createBuildDirectory,
  copyPublicFolder,
  printErrors,
  printFileSizes,
  logSuccess,
  init
} = require('../utils');

// Script steps
init();
checkRequiredFiles();
createBuildDirectory();
build();
copyPublicFolder();

// Create a production build
function build() {
  console.log('Creating an optimized production build...');

  webpack(config)
    .run((err, stats) => {
      if (err) {
        printErrors('Failed to compile.', [err]);
        process.exit(1);
      }

      if (stats.compilation.errors.length) {
        printErrors('Failed to compile.', stats.compilation.errors);
        process.exit(1);
      }

      if (process.env.CI && stats.compilation.warnings.length) {
        printErrors('Failed to compile.', stats.compilation.warnings);
        process.exit(1);
      }

      logSuccess('Compiled successfully.\n');

      console.log('Bundle size details:\n');
      printFileSizes(stats);

      console.log(`\nThe ${chalk.green('build')} folder is ready to be deployed.\n`);
    });
}
