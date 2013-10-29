# Easel

A boilerplate for building large Backbone projects that can run on the server and client. Modeled after the architecture of production apps at [Artsy](http://artsy.net/).

[Download Easel in Javascript](https://github.com/artsy/easel/archive/master.zip)
[Download Easel in Coffeescript](https://github.com/artsy/easel/archive/master.zip)

## Introduction

Easel makes it easy to get started writing flexible & modular Backbone apps that can run in the browser and on the server using [node.js](http://nodejs.org/). Built on the shoulders of popular libraries like [Express](http://expressjs.com/), [Backbone](http://backbonejs.org/), and [Browserify](http://browserify.org/). Easel is not a framework or library of it's own, but rather a boilerplate of libraries and patterns that can be leveraged or abandoned as needed.

### Sharing code client and server... hasn't Meteor, Derby, and Rendr already solved this?

[Meteor](http://www.meteor.com/) and [Derby](http://derbyjs.com/) do a great job of providing large full-stack frameworks meant to build realtime web apps from the ground up. While great full-stack solutions, this doesn't plug into existing infrastructures so easily, especially when trying to use an external API as your main data source.

On the other hand [Rendr](https://github.com/airbnb/rendr) is a lighter-weight library on top of Backbone that introduces new concepts like controllers, special view classes, fetchers, etc. to reduce boilerplate and glue code. At the same time it doesn't try to prescribe organizational structure. Easel does sort of the reverse -- it doesn't provide any new APIs and instead suggests tools and structure that make sharing, and maintaining, Backbone code between the client and server simple.

Easel tries to take a fundamentally different approach to sharing code. Many existing solutions try to create a shared environment where one can write code as if they don't have to think about whether it's running in the browser or on the server. Easel on the other hand focuses on modularity and explicitly requiring components that can very clearly work on both sides such as domain logic, templates, and libraries, leaving the glue code up to you. At the cost of boilerplate this hopefully makes Easel a more flexible, debuggable, lighter-weight option than some of the other batteries included frameworks.

## Getting Started

### Installation

1. Install [node.js](http://nodejs.org/)
2. [Download the boilerplate](https://github.com/artsy/artsy-node-boilerplate/archive/master.zip)
3. Install node modules `npm install`
4. Run the server `make s`
5. Visit [localhost::4000](http://localhost:4000) and see an example that uses the Github API.

### Overview

Easel is composed of some core tools you should learn before diving in.

* [Backbone](http://backbonejs.org/)
* [Express](http://expressjs.com/)
* [Browserify](https://github.com/substack/node-browserify)
* [Sharify](https://github.com/artsy/sharify)
* [Benv](https://github.com/artsy/benv)

Some modules come with Easel by default but could easily be swapped out with your preference.

* [Jade](https://github.com/visionmedia/jade)
* [Stylus](https://github.com/learnboost/stylus)
* [Mocha](https://github.com/OliverJAsh/node-jadeify2)
* [Zombie](http://zombie.labnotes.org/)

Easel is simply a boilerplate structure for a Backbone application. So even though it does render on the server, it's main data source is meant to be an external HTTP API. This can come in a [variety](https://github.com/intridea/grape) [of](http://expressjs.com/) [forms](http://flask.pocoo.org/), and it's up to you to choose the best technology to serve your data over HTTP. Once you understand how the above projects work, diving into Easel is just a matter of understanding it's patterns.

### Project vs. Apps vs. Components

All to often monolithic frameworks will organize your code by type such as /views, /stylesheets, /javascripts, etc. This is fine and practical for small projects, but as soon as your app grows larger it becomes awkward to jump between folders and scan through large directories of files that pertain to vastly different sections of your project.

Easel borrows a page from [Django](https://www.djangoproject.com/) and encourages organizing your project into pieces grouped conceptually. There are three different levels of this organization:

#### Project

Refers to the root level and contains the initial setup code, the actual server boot script, and project-wide modules such as models, collections, and libraries. The server boot script is the root /index.js file and setup is extracted into /lib/setup.js to encourage modularizing and testing your setup code.

#### Apps

Apps are small express applications that are mounted into the main project [à la this video](http://vimeo.com/56166857). Sometimes you need a full fledged thick-client app and other times you just need a simple static page. Because of this apps can greatly vary in complexity. What deliniates apps from one another is they conceptually deal with a certain section of your project, and they are often separated by a full page-refresh. For instance you might have a complex single page "search" app or a simple static "about" page app. The organization of these apps are up to you, for a simple app you may put all of your code into an index.js file, while more complex apps may have their own /models, /components, /stylesheets, /templates, etc. folders.

#### Components

Components are small portions of UI re-used across apps. These are similar to [jQuery UI](http://jqueryui.com/) plugins or Backbone views. Components can consist of any number of stylesheets, templates, and/or client-side code. They can range from something as complex as an autocomplete widget to something as simple as a headers stylesheet styling h1-h6 tags.

Easel doesn't have project-level templates and stylesheets to encourage modularizing these pieces into apps and components. However for practicality's purpose if you need to write more global code or assets, you can write it in a "layout" component.

### Models & Collections

Backbone model and collection code is often used across apps and therefore is placed at the root project level under /models and /collections. This code is meant to work on the server and client so it must be self-contained domain logic. Model code can't use APIs only available to the browser or node such as accessing the file system or the XMLHttpRequest object. Backbone.sync is used as a layer over HTTP accessible on both sides, and any HTTP requests therefore need be wrapped in a Backbone class or used by an anonymous instance, e.g. `new Backbone.Model({ url: '/api/system/up' }).fetch({ success: //... })`.

### Libraries

When you do need to wrap up logic that doesn't pertain to your domain data it's encouraged to write them as modules under /lib. Libraries can be server only such as a converting an uploaded jpeg file into thumbnails, or browser-only such as parsing `window.location`. Libraries can also be shared between server and client such as a date parsing library or even an image converting library that uses imagemagick on the server and the HTML5 canvas API on the client. 

Libraries are distinct from models and collections in that they don't have domain logic and generally don't use persistent data. They also shouldn't deal with UI or any general routing or application logic that can be handled by an app or component.

### Testing

Tests are broken up into project-level and app-level tests that are run together in `make test`.

#### Project-level Tests

Project-level tests involve any component, library, model, or collection tests. Because Easel uses Browserify to write model and collection code as modules that can run on the server you can easily test your Backbone model and collection code in node.js without any extra ceremony. However some libraries and most components are meant to be run in the browser. For these you can use [benv](http://github.com/artsy/benv) to set up a fake browser environment in node and require these modules for testing.

#### App-level Tests

App-level tests can come in a number of different forms, but often involve some combination of route, template, client-side, and integration tests. Given that apps can vary in complexity and number of components they use, it's up to you to decide how to structure and test their parts.

Some common practices are to split up your route handlers into testable functions that pass in stubbed request and response objects. Templates can simply be compiled and asserted against the generated html. Client-side code can be unit tested in node using [benv](http://github.com/artsy/benv), and using Backbone views can go a long way to making this easier. Finally a fast suite of integration tests are run by starting the project against a fake API server that can be tested with a headless browser like [Zombie](http://zombie.labnotes.org/).

### Build Scripts & Configuration

Easel comes with simple configuration and build tools that are standard with most environments. A [Makefile](http://en.wikipedia.org/wiki/Make_(software)) wraps scripts into nice command-line friendly tasks. When more complex build scripts are needed it's encouraged to wrap them up into node modules that can be run via `node lib/script.js`. If more complex command-line options are needed [Commander.js](http://visionmedia.github.io/commander.js/) is a popular framework for this. Configuration such as whether you're running in production, your external API keys, etc. is handled entirely by [environment variables](http://en.wikipedia.org/wiki/Environment_variable). For ease of setup there is a /config.js file that wraps `process.env` and declares sensible defaults for development.