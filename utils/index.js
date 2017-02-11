const chalk = require('chalk');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const paths = require('../config/paths');

module.exports = {
  logSuccess,
  logError,
  copyPublicFolder,
  createBuildDirectory,
  resolveApp,
  checkRequiredFiles,
  printFileSizes,
  printErrors
};

// Log a green success message to the terminal
function logSuccess(text) {
  console.log(chalk.green(text));
}

// Log a red error message to the terminal
function logError(text) {
  console.log(chalk.red(text));
}

// Copy all files from the public folder to the build one
function copyPublicFolder() {
  fse.copySync(paths.public, paths.build, {
    dereference: true
  });
}

// Create an empty build directory
function createBuildDirectory() {
  fse.removeSync(paths.build);
  fse.mkdirpSync(paths.build);
}

// Resolve relative paths.
function resolveApp(relativePath) {
  const appDirectory = fs.realpathSync(process.cwd());

  return path.resolve(appDirectory, relativePath);
}

// Warn and crash if required files are missing.
function checkRequiredFiles() {
  const indexHtmlExists = fse.existsSync(paths.indexHtml);
  const indexJsExists = fse.existsSync(paths.indexJs);

  if (!indexHtmlExists || !indexJsExists) {
    logError(`\nSome required files couldn't be found. Make sure these all exist:\n`);
    logError(`\t- ${paths.indexHtml}`);
    logError(`\t- ${paths.indexJs}\n`);

    process.exit(1);
  }
}

// Print a detailed summary of build files.
function printFileSizes(stats) {
  stats.toJson().assets
    .filter(asset => /\.(js|css)$/.test(asset.name))
    .map(asset => {
      const fileStats = fs.statSync('./build/' + asset.name);
      const fileSize = (fileStats.size / 1000).toFixed(2); // in kbs, originally in bytes

      return {
        name: asset.name,
        size: fileSize,
        unit: 'Kb.'
      };
    })
    .sort((a, b) => b.size - a.size)
    .forEach(asset => {
      const {name, size, unit} = asset;

      logSuccess(`\t- ${name} -> ${size} ${unit}`);
    });
}

// Print out a list of errors to the terminal.
function printErrors(summary, errors) {
  logError(`${summary}\n`);

  errors.forEach(err => {
    logError(`\t- ${err.message || err}`);
  });

  console.log();
}
