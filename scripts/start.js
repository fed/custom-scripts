import chalk from 'chalk';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../config/webpack';
import devServerConfig, {port} from '../config/server';
import {logError} from '../utils';

serve();

function serve() {
  const compiler = webpack(webpackConfig);
  const server = new WebpackDevServer(compiler, devServerConfig);

  // Launch WebpackDevServer
  server.listen(port, err => {
    if (err) {
      return logError(err);
    }

    const url = `http://localhost:${port}`;

    console.log('\nStarting the development server...');
    console.log(`\nApp will go live on ${chalk.green(url)}`);
  });
}
