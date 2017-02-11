import webpack from 'webpack';
import noop from 'lodash/noop';
import paths from '../config/paths';

// Webpack plugins
import StyleLintPlugin from 'stylelint-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import VersionFile from 'webpack-version-file';

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

export default {
  entry: [
    // activate HMR for React
    'react-hot-loader/patch',

    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack-dev-server/client?http://localhost:6789',

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',

    // the entry point of our app
    paths.indexJs
  ],

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
        loader: 'eslint-loader',
        exclude: /node_modules/
      },

      // Parse all ES6/JSX files and transpile them to plain old JS
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
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
                ident: 'postcss',
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
      files: '{,**/}*.css'
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
    }),

    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin()
  ],

  // Avoid complex relative routes when importing modules
  resolve: {
    modules: [
      paths.source,
      'node_modules'
    ]
  }
};
