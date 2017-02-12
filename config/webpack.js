const webpack = require('webpack');
const noop = require('lodash/noop');
const path = require('path');
const paths = require('../config/paths');

// Webpack plugins
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VersionFile = require('webpack-version-file');

// Node Environment
const ENVIRONMENT = process.env.NODE_ENV || 'development';

// Optimize React code on production only (minification, uglify, mangling, etc.)
function uglify() {
  if (ENVIRONMENT === 'production') {
    return new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    });
  }

  return noop;
}

module.exports = {
  entry: paths.indexJs,

  output: {
    // Needs to be an absolute path
    // path: resolve(__dirname, 'build'),
    path: paths.build,

    filename: 'bundle.js',

    // necessary for HMR to know where to load the hot update chunks
    publicPath: '/'
  },

  // context: resolve(__dirname, 'src'),

  devtool: 'inline-source-map',

  // Loaders
  module: {
    rules: [
      // Lint all JS files using eslint
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [{
          loader: 'eslint-loader',
          options: {
            // Point ESLint to our predefined config file (.eslintrc)
            configFile: path.join(__dirname, './eslint.json'),
            useEslintrc: false,
            emitWarning: true,
            emitError: true,
            failOnWarning: false,
            failOnError: true
          }
        }],
      },

      // Parse all ES6/JSX files and transpile them to plain old JS
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            // webpack understands the native import syntax, and uses it for tree shaking
            ['es2015', { modules: false }],

            // Specifies what level of language features to activate.
            // Stage 2 is "draft", 4 is finished, 0 is strawman.
            // See https://tc39.github.io/process-document/
            'stage-2',

            // Transpile React components to JavaScript
            'react'
          ]
        }
      },

      // Allow importing CSS modules and extract them to a .css file
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                plugins: () => [
                  require('postcss-modules-values'),
                  require('autoprefixer'),
                  require('precss')
                ]
              }
            }
          ]
        })
      },

      // Allow importing SVG files
      {
        test: /\.svg$/,
        use: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },

      // Allow importing PNG files
      {
        test: /\.png$/,
        use: 'url-loader?mimetype=image/png'
      }
    ]
  },

  plugins: [
    // Lint CSS files using Stylelint
    new StyleLintPlugin({
      context: paths.source,
      files: '{,**/}*.css',
      configFile: path.join(__dirname, './stylelint.json')
    }),

    // ExtractTextPlugin
    new ExtractTextPlugin('bundle.css'),

    // Optimize production build
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENVIRONMENT)
    }),

    uglify(),

    // Write exposed version text file next to bundle.js
    new VersionFile({
      output: paths.build + '/' + 'version.txt',
      templateString: '<%= name %>@<%= version %>\n' +
        'Build date: <%= buildDate %>\n' +
        'Environment: <%= environment %>',
      data: {
        environment: ENVIRONMENT
      }
    })
  ],

  // Avoid complex relative routes when importing modules
  resolve: {
    modules: [
      paths.source,
      'node_modules'
    ]
  }
};
