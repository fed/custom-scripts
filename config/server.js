const paths = require('./paths');

// WebpackDevServer Configuration
module.exports = {
  // Enable gzip compression of generated files.
  compress: true,

  // Silence WebpackDevServer's own logs since they're generally not useful.
  // It will still show compile warnings and errors with this setting.
  clientLogLevel: 'none',

  // match webpack's output path
  contentBase: paths.build,

  // Match the output `publicPath`. In development, we always serve from /.
  publicPath: '/',

  historyApiFallback: true,

  stats: "errors-only"
};
