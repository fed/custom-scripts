# custom-scripts

![React & Redux Boilerplate](http://i.imgur.com/Agl5kuk.png)

This is a simple set of custom build scripts I've put together after setting up a bunch of React apps at work. These scripts hold all of the build configuration for my React apps. Even though it's **fairly opinionated** project, with tools and decisions that make sense to me and my team, all of the libraries and tools I'm using here are pretty standard and widespread in the React community nowadays.

I've followed the same idea behind [**create-react-app**](https://github.com/facebookincubator/create-react-app) and [**react-scripts**](https://github.com/facebookincubator/create-react-app/tree/master/packages/react-scripts). Main difference is here I'm supporting CSS modules and various PostCSS plugins in an effort to make this production ready.

Here's a list of what I've included:

* UI Library: [**React**](https://facebook.github.io/react/)
* Styling: [**CSS Modules**](https://github.com/css-modules/css-modules) and [**PostCSS**](http://postcss.org/)
* Module Bundler: [**Webpack 2**](https://webpack.github.io/)
* ES6/7 & JSX -> ES5: [**Babel**](https://babeljs.io/)
* Linting: [**eslint**](http://eslint.org/) and [**stylelint**](http://stylelint.io/)
* Test Libraries: [**Jest**](https://facebook.github.io/jest/) and [**Enzyme**](https://github.com/airbnb/enzyme)

## Prerequisites

* Node.js (https://nodejs.org/) v4.0.0 or greater

## Getting Started

Add this module to your development dependencies:

```
npm install --save-dev custom-scripts # npm
yarn add custom-scripts --dev # yarn
```

Set up the following scripts on your `package.json`:

```js
"scripts": {
  "start": "custom-scripts start",
  "build": "custom-scripts build",
  "test": "custom-scripts test"
}
```

Make sure:

* all of your application code lives under a directory called `src`.
* you've got a `public` folder hosting your `index.html` file and any other static asset you might need (such as your favicon).
* all of your tests are in a `test` folder.

And that's about it for making this module work with your project!

## Contributing

Please submit an issue or create a PR if you find a better way to do things or know of a nicer configuration 🙂

## License

MIT
