import paths from './paths';

// WebpackDevServer Configuration
export default {
  // Enable gzip compression of generated files.
  compress: true,

  // Silence WebpackDevServer's own logs since they're generally not useful.
  // It will still show compile warnings and errors with this setting.
  clientLogLevel: 'none',

  // match webpack's output path
  contentBase: paths.build,

  // Match the output `publicPath`. In development, we always serve from /.
  publicPath: '/',

  // Enable HMR on the server. Note that only changes
  // to CSS are currently hot reloaded. JS changes will refresh the browser.
  hot: true,

  historyApiFallback: true,

  stats: {
    colors: true
  }
};
