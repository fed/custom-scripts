const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../config/webpack');
const devServerConfig = require('../config/server');
const {logError} = require('../utils');

serve();

function serve() {
  const compiler = webpack(webpackConfig);
  const server = new WebpackDevServer(compiler, devServerConfig);

  // Launch WebpackDevServer
  server.listen(6789, err => {
    if (err) {
      return logError(err);
    }

    const url = `http://localhost:${port}`;

    console.log('\nStarting the development server...');
    console.log(`\nApp will go live on ${chalk.green(url)}`);
  });
}
