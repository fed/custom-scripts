const {resolveApp} = require('../utils');

module.exports = {
  // The source folder is where the application source code lives in.
  source: resolveApp('src'),

  // The public folder containing the index.html, favicon.ico and other static assets.
  public: resolveApp('public'),

  // The build folder where we'll copy the bundled files.
  build: resolveApp('build'),

  // custom-scripts assumes this file to be the and therefore it must exist
  indexHtml: resolveApp('public/index.html'),

  // custom-scripts assumes this file to be the application entry point and therefore it must exist.
  indexJs: resolveApp('src/index.js')
};
