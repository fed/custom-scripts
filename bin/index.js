#!/usr/bin/env node
const chalk = require('chalk');
const spawn = require('cross-spawn');
const [,, script, ...args] = process.argv;

switch (script) {
  case 'build':
  case 'start':
  case 'test':
    const result = spawn.sync(
      'node',
      [require.resolve(`../scripts/${script}`)].concat(args),
      { stdio: 'inherit' }
    );

    process.exit(result.status);
    break;

  default:
    console.log(`Unknown script: ${chalk.red(script)}. Please check out the docs.\n`);
    break;
}
