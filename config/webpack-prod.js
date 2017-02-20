process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const assign = require('lodash/assign');
const paths = require('../config/paths');
const VersionFile = require('webpack-version-file');
const webpackBaseConfig = require('./webpack-base');

const webpackProdConfig = assign({}, webpackBaseConfig, {
  devtool: 'source-map',

  plugins: webpackBaseConfig.plugins.concat([
    // Optimize production build
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
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
