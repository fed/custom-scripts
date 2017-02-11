import fs from 'fs-extra';
import chalk from 'chalk';
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
