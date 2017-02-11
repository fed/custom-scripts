import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import paths from '../config/paths';

// Log a green success message to the terminal
export function logSuccess(text) {
  console.log(chalk.green(text));
}

// Log a red error message to the terminal
export function logError(text) {
  console.log(chalk.red(text));
}

// Copy all files from the public folder to the build one
export function copyPublicFolder() {
  fs.copySync(paths.public, paths.build, {
    dereference: true
  });
}

// Create an empty build directory
export function createBuildDirectory() {
  fs.removeSync(paths.build);
  fs.mkdirpSync(paths.build);
}

// Resolve relative paths.
const appDirectory = fs.realpathSync(process.cwd());

export function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

// Warn and crash if required files are missing.
export function checkRequiredFiles() {
  const indexHtmlExists = fs.existsSync(config.paths.index.html);
  const indexJsExists = fs.existsSync(config.paths.index.js);

  if (!indexHtmlExists || !indexJsExists) {
    logError(`\nSome required files couldn't be found. Make sure these all exist:\n`);
    logError(`\t- ${config.paths.index.html}`);
    logError(`\t- ${config.paths.index.js}\n`);

    process.exit(1);
  }
}

// Print a detailed summary of build files.
export function printFileSizes(stats) {
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
export function printErrors(summary, errors) {
  logError(`${summary}\n`);

  errors.forEach(err => {
    logError(`\t- ${err.message || err}`);
  });

  console.log();
}
