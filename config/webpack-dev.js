const assign = require('lodash/assign');
const paths = require('../config/paths');
const webpackBaseConfig = require('./webpack-base');

const webpackDevConfig = assign({}, webpackBaseConfig, {
  entry: [
    // Include an alternative client for WebpackDevServer. A client's job is to
    // connect to WebpackDevServer by a socket and get notified about changes.
    // When you save a file, the client will either apply hot updates (in case
    // of CSS changes), or refresh the page (in case of JS changes). When you
    // make a syntax error, this client will display a syntax error overlay.
    require.resolve('react-dev-utils/webpackHotDevClient'),

    // The entry point to our app.
    paths.indexJs
  ],

  // This is slow initially, but it provides fast rebuild speed and yields real files.
  // Line numbers are correctly mapped since it gets mapped to the original code.
  devtool: 'eval-source-map'
});

module.exports = webpackDevConfig;
