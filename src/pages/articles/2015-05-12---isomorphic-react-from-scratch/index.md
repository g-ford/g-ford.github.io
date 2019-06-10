---
title: 'Isomorphic React from Scratch: Hello Isomorphism'
date: '2015-05-12T08:47:36Z'
layout: post
draft: false
path: "/posts/isomorphic-react-from-scratch/"
category: "programming"
tags:
  - "react"
  - "javascript"
description: "This is my journey learning what isomorphic javscript is and how one would go about building a site or application the way the cool kids do."
---
Isomorphic javascript is the new cool in the web development world. This is my journey learning what isomorphic javscript is and how one would go about building a site or application the way the cool kids do.

I have a lot of experience with a number of different web application langauges and frameworks. From old school things like PHPNuke to Ruby on Rails, MVC.Net, Django and Flask, and more recently Angular, I have seen a lot of different ways to build a web application.

Most recently I have been building Django backends with Django Rest Framework and Angular front ends. However, with the sharp change in direction that Angular 2 is taking I thought it was time to look around a bit more and see what else was available.

After some extensive research (lasting approximately 10 minutes) I decided that my current project should be based on React using a Flux achitecture with a Node backend and therefore I should look at isomorphism. That's a lot of new technology and ideas to wrap my head around for a small project but I had the time and the freedom.

## Iso who?

> **isomorphic** - _adjective_ - corresponding or similar in form and relations.
> -- <cite>[Oxford Dictionary](//www.oxforddictionaries.com/definition/english/isomorphic)</cite>

An isomorphic application is one that uses the same code on the front end and the back end. Most often this means using node on the backend and a tool to make the back end code work on the front end[^1]. In the end you write (mostly) one set of code that can be rendered either in node or in the browser.

[^1]: Node is by no means the only option, nor the first. [GWT](//www.gwtproject.org/) has been around a long time. More recently there is [ClojureScript](//github.com/clojure/clojurescript/wiki) and [TypeScript](http://www.typescriptlang.org/)

There are a [large number of frameworks and libraries](//isomorphic.net/libraries) to help you build an isomorphic application but for this series I will be coding many of the building blocks from scratch.

## What to build

Rather than build the typical blog or to do list sample project I'm going to build something fun - a simple guessing game based on social media. It will pick a random image or post from your social sphere and present multiple choice options for you to guess which of your friends posted it. This will provide us with some good learning opportunites such as

- social media APIs for authentication
- keeping the game progress and state
- some storage for a leader board
- deep linking to share results

I shall call it 'That's what who said!?'

## Getting prepared

Let's get some boilerplate out of the way. First we need to install [node](//nodejs.org) and by extension the node package manager (npm). To begin we need to create an npm module using `npm init` that we can store all our other dependencies and configuration against.

As mentioned earlier we will need to use some tools to allow CommonJS style modules to be used in the browser. There are number of competing projects at the moment, the biggest two being [Browserify](//browserify.org/) and [Webpack](//webpack.github.io/). I'm going to use Webpack as it also fulfills some other requirements I have such as building CSS bundles, hot reload etc that would normally require the use of something like Gulp or Grunt.

We are also going to use React and Express so we will install all of these now.

```bash
npm install --save webpack express react
```

We'll add an npm script for running our local instance. This will get updated in the future but for now this will suffice.

```js
// in package.json
...
 "scripts": {
    "start": "webpack && node app/server.js"
  },
...
```

Similarly our webpack configuration will start very simple and get progressively more complex. We will have one client side entry point that will get bundled out to a single file.

```js
module.exports = {
  entry: './app/client.js',
  output: {
    path: './assets',
    filename: 'bundle.js',
  },
};
```

## Serving Hello World

We'll start by creating a very simple hello world page - first using non-isomorphic techniques and then extend it to be isomorphic.

For the backend we are using express. This script is adapted from the [hello world example](http://expressjs.com/starter/hello-world.html). It renders a very simple div and a script tag to load our client side script.

```js
// app/server.js
var express = require('express');
var app = express();

// set the static location to the place where webpack will bundle
// the client side scripts to
app.use(express.static(__dirname + '/../assets/'));

app.get('/', function(req, res) {
  res.send(
    '<div id="app">Hi</div><script src="bundle.js" type="text/javascript"></script>'
  );
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
```

If we start this up using `npm run start` and then point our browser at `http://loclahost:3000` you should get a page that simply says 'Hi' and has a 404 error for `bundle.js`.

Now let's write a very simple client side React application.

```js
// app/client.js
var React = require('react');

// I'm intentially not using JSX just yet
React.render(React.DOM.h1(null, 'Hello!'), document.getElementById('app'));
```

This time when `webpack` runs it will follow the dependencies in `client.js` to build a bundle that includes our client side code, the React library, all of its dependencies and an implmentation of `require` that works in the browser.

Again we will run `npm run start` and go to `http://localhost:3000`. This time you should see a flash of the server rendered 'Hi' followed by it being immediately overwritten by the client side 'Hello!'.

## Hello Isomorphic

To make the application truly isomorphic we need to be able to render the exact same output on the server and the client. The client should also use progressive enhancement to only update or rewrite as needed when boostrapped. This is where React shines with its isomorphism friendly APIs built in.

First of all we will need to move our awesome application into it's own component that can be reused on the client or the server.

```js
// app/components/app.js
var React = require('react');

module.exports = React.DOM.h1(null, 'Hello!');
```

We then need to update `client.js` to use the new component.

```js
// app/client.js
var React = require('react');
var html = require('./components/app');

React.render(html, document.getElementById('app'));
```

This puts us back in the same place. Running the app still gives a flash of server rendered content before the client rendering kicks in. Let's update the server code to render the same as the client.

```js
// app/server.js
var express = require('express');
var React = require('react');
var html = require('./components/app');

var app = express();

// set the static location to the place where webpack will
// bundle the client side scripts up
app.use(express.static(__dirname + '/../assets/'));

app.get('/', function(req, res) {
  res.send(
    '<div id="app">' +
      React.renderToString(html) +
      '</div><script src="bundle.js" type="text/javascript"></script>'
  );
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
```

Here we include the same javascript code as the client is using and render it to a string before sending it down the HTTP pipe. When React starts up on the client it will notice that the HTML is the same as what it would need to render and does not overwrite it.

This time when you run the server you won't see any flash of server content or any re-rendering.

## Getting fancy with webpack

Webpack can do so much more for us: custom loaders and hot loading being two really interesting ones.

Whilst in development we will have assets automatically reloaded into the browser, however in production we want assets served from file.

### Hot loading

Before we start hot loading we should first start using a proper HTML template. First we have a few more things to install.

```bash
npm install --save ejs proxy-middleware webpack-dev-server
```

This is a really simple ejs template that will use the webpack dev server to load our assets and communicate to the weback dev server for hot loading.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title><%= title %></title>
    <meta
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      name="viewport"
    />

    <%if (settings.env == 'production') { %>
    <link rel="stylesheet" type="text/css" href="/assets/app.css" />
    <% } %>
  </head>
  <body>
    <div id="app"><%- body %></div>

    <%if (settings.env != 'production') { %>
    <script src="http://localhost:8080/webpack-dev-server.js"></script>
    <% } %>

    <script src="/assets/bundle.js"></script>
  </body>
</html>
```

We need to update the server configuration to pass through assets to the webpack dev server when in development. In production we'll serve direct from disk. We also need to update the route to serve our new HTML template.

```js
// app/server.js

var isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  // proxy assets through to webpack-dev-server
  var url = require('url');
  var proxy = require('proxy-middleware');
  app.use('/assets', proxy(url.parse('http://localhost:8080/assets')));
} else {
  // set the static location to the place where webpack will
  // bundle the client side scripts up
  console.log(path.resolve(__dirname, 'assets'));
  app.use('/assets', express.static(path.resolve(__dirname, '..', 'assets')));
}

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
  res.render('main.html', {
    body: React.renderToString(App()),
    title: "That's what who said!?",
  });
});
```

We now have to tell webpack to supply the dev server files and which `publicPath` to serve them under - this needs to match the path we are proxying above. We do this by adding to the `entry` array as they are served as seperate files.

```js
// webpack.config.js
...
module.exports = {
    entry: [
        './app/client.js',
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
    ],
    output: {
        path: './assets',
        filename: "bundle.js",
        publicPath: "/assets/"
    },
...
```

Next we change the `start` script to use the webpack dev server in hot mode. We'll add a `build` script as well that will write all the files to the assets directory when invoked. We also need nodemon to monitor the node server and restart on changes and npm-run-all to be able to run our server and webpack in parrallel.

```bash
npm install --save nodemon npm-run-all
```

```json
// package.json
"scripts": {
    "start": "npm-run-all --parallel dev server",
    "server": "nodemon app/server.js",
    "dev": "webpack-dev-server --hot --color --progress --devtool source-map",
    "build": "webpack -p --config webpack.prod.config.js"
  },
```

Now when in development we run `npm run start` and our js files will be served from the webpack dev server on port 8080. You can see the hot loader in action by making a small change to `app/components/app.js` and see the change reflected in the browser almost immediately with no refresh. The console log will also contain some helpful info if or when things go a bit wrong.

To run a production style build with minified code, dead code removal and all the other good things that webpack does you can use:

```bash
NODE_ENV=production npm run build
NODE_ENV=production node app/server.js
```

### Using JSX

To use JSX in our components we need to use a JSX transpiler. We will use `jsx-loader` with webpack for the front and `node-jsx` on the back. We'll also include a hot loader specifically for React components.

```bash
npm install --save node-jsx jsx-loader react-hot-loader
```

To enable node-jsx in the backend code we simple need to add this to the top of `app/server.js`. Using `harmony: true` will enable ES6 style code in our JSX files.

```js
// app/server.js
require('node-jsx').install({
  harmony: true,
  extension: '.jsx',
});
```

To enable JSX code to be used on the frontend we need to tell webpack how to use `jsx-loader` by adding a module loader to our webpack config that looks for jsx files and puts them through the jsx and react hot loaders. We'll make sure to also use harmony again for ES6.

```js
// webpack.config.js
module.exports = {
    ...
    module: {
      loaders: [
        { test: /\.jsx?$/, loaders: ['react-hot', 'jsx?harmony'], include: path.join(__dirname, 'app') }
      ]
    },
    plugins: [
      // enable React hot module loading
      new webpack.HotModuleReplacementPlugin(),
      // don't run the hot loading if a file has an error
      new webpack.NoErrorsPlugin()
    ]
    ...
}
```

Let's test this configuration by changing our app React component to use JSX.

```js
// app/components/app.jsx (used to be app/components/app.js)
var React = require('react');

module.exports = React.createClass({
  render: function() {
    return <h1>Hello!</h1>;
  },
});
```

Stop and restart the dev servers and there should be no change in the applications output.

### Loading styles

Everyone has their own style preference but I like to use SASS and bootstrap as my baseline.

Here again we can use webpack to simplify the build process and serve up a single file. I'm not completely sold on requiring styles in the javascript components so I will create a single file that is output to `assets/app.css` that our HTML template can load.

First of all we will need to include SASS, bootstrap and a couple loaders into our project.

```bash
npm install --save css-loader sass-loader file-loader boostrap-sass style-loader
```

First we have to create our main styles page and tell it to include the boostrap files.

```sass
// app/styles/app.scss
$icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
@import "~bootstrap-sass/assets/stylesheets/_bootstrap.scss";
```

It is important to note that the paths must start with `~` but not `~/`. The former will enable the webpack loader to search through it's list of standard include directories (one of which is node_modules) the latter will look in the users home directory.

The webpack loader will treat `@import` and `url(...)` in the css files as analogous to `require()`. We will need to set up loaders for some common filetypes in our CSS such as image and font files.

```js
// webpack.config.js
...
    entry: [
        './app/client.js',
        './app/styles/app.scss',
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
    ],
    module: {
      loaders: [
        { test: /\.jsx?$/, loaders: ['react-hot', 'jsx?harmony'], include: path.join(__dirname, 'app') },
        { test: /\.scss$/, loader: 'style!css?sourceMap!sass?sourceMap' },
        { test: /\.(jpe?g|gif|png|ttf|eot|svg|woff2?)$/, loader: "file" }
      ]
    },
    plugins: [
      // enable React hot module loading
      new webpack.HotModuleReplacementPlugin(),
      // don't run the hot loading if a file has an error
      new webpack.NoErrorsPlugin(),
    ]

...
```

All our image and font files are passed to file-loader which merely copies them into the output directory. You might prefer to use url-loader for smaller files which inlines them into data uris.

Our styles are first put through SASS and CSS loaders and then the style loader will create the appropriate link tag in the head of our HTML.

For production we will need to use the Extract Text plugin which is able to write the results out to the output directory.[^etp] If you look through the output generated by `npm run build` it has also changed any `url()` to include the files from the assets directory as well.

[^etp]: I have not explained the production config in detail here. See [webpack.prod.config.js](https://github.com/alephnullplex/twws/blob/part1/webpack.prod.config.js) for more details.
