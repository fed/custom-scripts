process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const assign = require('lodash/assign');
const paths = require('../config/paths');
const VersionFile = require('webpack-version-file');
const webpackBaseConfig = require('./webpack-base');

const webpackProdConfig = assign({}, webpackBaseConfig, {
  // Don't attempt to continue if there are any errors.
  bail: true,

  // A full SourceMap is emitted as a separate file (bundle.js.map).
  // It adds a reference comment to the bundle so development tools know where to find it.
  devtool: 'source-map',

  plugins: webpackBaseConfig.plugins.concat([
    // Optimize production build
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      },
      sourceMap: true
    }),

    // Write exposed version text file next to bundle.js
    new VersionFile({
      output: paths.build + '/' + 'version.txt',
      templateString: '<%= name %>@<%= version %>\n' +
        'Build date: <%= buildDate %>\n' +
        'Environment: <%= environment %>',
      data: {
        environment: 'production'
      }
    })
  ])
});

module.exports = webpackProdConfig;
