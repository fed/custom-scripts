const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../config/webpack-dev');
const devServerConfig = require('../config/server');
const {logError} = require('../utils');

serve();

function serve() {
  const compiler = webpack(webpackConfig);
  const server = new WebpackDevServer(compiler, devServerConfig);
  const port = 6789;

  // Launch WebpackDevServer
  server.listen(port, err => {
    if (err) {
      return logError(err);
    }

    const url = `http://localhost:${port}`;

    console.log('Starting the development server...');
    console.log(`App will go live on ${chalk.green(url)}`);
  });
}
