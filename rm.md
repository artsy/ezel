# Ezel

![image](https://f.cloud.github.com/assets/555859/1462363/5ce5d010-44f4-11e3-99cd-e7a2f4f0c06d.png)

A boilerplate for Backbone projects that share code server/client and scale through modular architecture.

Built on popular libraries like [Express](http://expressjs.com/), [Backbone](http://backbonejs.org/), and [Browserify](http://browserify.org/), Ezel isn't a framework or library of it's own but rather a boilerplate of libraries and patterns that can be leveraged or abandoned as needed.

## Getting Started

### Installation

1. Install [node.js](http://nodejs.org/)
2. Download the boilerplate: [Javascript](https://github.com/artsy/ezel/archive/master.zip) | [Coffeescript](https://github.com/artsy/ezel/archive/coffeescript.zip)
3. Rename the folder to your own project and `cd` to the directory
4. Install node modules `npm install`
5. Run the server `make s`
6. Visit [localhost:4000](http://localhost:4000) and see an example that uses the GitHub API.

### Overview

First it would be good to familiarize yourself with the tools Ezel is built on.

* [Backbone](http://backbonejs.org/)
* [Express](http://expressjs.com/)
* [Browserify](https://github.com/substack/node-browserify)
* [Sharify](https://github.com/artsy/sharify)
* [Benv](https://github.com/artsy/benv)

At it's heart Ezel is just a Backbone app and therefore relies on an external API as it's data source. This can come in a [variety](http://expressjs.com/) [of](https://github.com/intridea/grape) [forms](http://flask.pocoo.org/) and it's up to you to choose the best technology to serve your data over HTTP.

Once you understand how the above tools work, diving into Ezel is just a matter of understanding it's patterns. After this, when you're ready, you can delete all of the example files and start clean by running `make clean`.

## Project vs. Apps vs. Components

Monolithic frameworks tend to organize your code by type such as /views, /stylesheets, /javascripts, etc. As your app grows larger this becomes an awkward and unmaintainable way to delineate parts of your project. Ezel encourages grouping files into conceptual pieces instead of by type.

There are three different levels of this organization:

### Project

Refers to the root, "global", level and contains the initial setup/server code and project-wide modules such as models, collections, and libraries. Setup code is extracted into /lib/setup to encourage modularizing and testing your setup code.

### Apps

Apps are small express applications that are [mounted into the main project](http://vimeo.com/56166857). What distinguishes apps from one another is that they conceptually deal with a certain section of your website, and are often separated by a full page-refresh. As such an app could be a complex thick-client "search" app, or a simple static "about" page.

The organization of these apps are up to you, for a simple app you may put all of your code into one express instance exported in a single index.js file. More complex apps may have their own /models, /components, /stylesheets, /templates, etc. folders. Large web projects often have a wide range of needs on a case by case basis. Instead of trying to solve every problem with the same architecture, Ezel remains flexible and modular so you can pick the right tools and patterns for the job.

### Components

Components are small portions of UI re-used across apps and generally contain a mix of stylesheets, templates, and client-side code. These can be thought of like a jQuery UI widget, Bootstrap component, or Backbone view. Examples can be complex, like an autocomplete widget, or as simple as a headers stylesheet styling h1-h6 tags.

## Models & Collections

Model code is meant to work on the server and client so it must strictly be domain logic around your data. Model code can't use APIs only available to the browser or node such as accessing the file system or the `XMLHttpRequest` object.

Backbone.sync is used as a layer over HTTP accessible on both sides. Any HTTP requests made in model and collection code therefore need be wrapped in a Backbone class or used by an anonymous instance e.g. `new Backbone.Model({ url: '/api/system/up' }).fetch({ success: //... })`.

## Libraries

Libraries are a place to store modules that are used across apps and don't pertain to domain logic or UI that can be better handled by models or components. These can be server only such as a library converting an uploaded jpeg file into thumbnails, browser-only such as an HTML5 Canvas library, or even shared such as a date parsing library that can be utilized on both the server and the client.

## Testing

Tests are broken up into project-level and app-level tests that are run together in `make test`. This boilerplate comes stocked with a suite of tests for the Github API example, so please take a look around for examples.

### Project-level Tests

Project-level tests involve any component, library, model, or collection tests. Because Ezel model code can run on the server you can easily test it in node without any extra ceremony. However components and some libraries are meant to be run in the browser. For these you can use [benv](http://github.com/artsy/benv) to set up a fake browser environment and require these modules for unit testing like any other module.

### App-level Tests

App-level tests can come in a number of different forms, but often involve some combination of route, template, client-side, and integration tests. Given that apps can vary in complexity and number of components they use, it's up to you to decide how to structure and test their parts.

Some common practices are to split up your route handlers into libraries of functions that pass in stubbed request and response objects. Templates can be directly compiled with jade and asserted against the generated html. Client-side code can be unit tested in node using [benv](http://github.com/artsy/benv) (Backbone views can help wrap code into testable methods). Finally a suite of integration tests use [Zombie](http://zombie.labnotes.org/) and boot up a version of the project with a fake API server found under /test/helpers/integration.

All of these techniques ensure your code remains decoupled, your tests run fast, and you stay happy and productive.

## Build Scripts & Configuration

Ezel uses simple configuration and build tools that are standard with most environments.

A [Makefile](http://en.wikipedia.org/wiki/Make_(software) designates build commands. When more complex build scripts are needed it's encouraged to wrap them in libraries that can be run via `node lib/script.js`.

Configuration is handled entirely by [environment variables](http://en.wikipedia.org/wiki/Environment_variable). For ease of setup there is a /config.js file that wraps `process.env` and declares sensible defaults for development.

## Asset Pipeline

Ezel's asset building is mostly handled by [Browserify](https://github.com/substack/node-browserify) and [Stylus](https://github.com/learnboost/stylus) with middleware for development and a `make assets` task to output more production ready files. Place your asset packages in /assets, point your script and style tags to /assets/<filename> in your views, and Ezel will wire the rest up for you.

Ezel's focus on modularity makes it easy to build up light-weight asset packages that are focused for your needs. This combined with rendering on the server makes it a great option for optimizing initial page load.

A common pattern would be to build asset packages per-app. For instance you may have a "search" app that uses assets from the layout component, an auto-complete component, and the search app's client-side code and stylesheets. In this case you would create an /assets/search.styl that imports each piece's stylesheets and an /assets/search.js that would require each piece's javascripts. In the view of the search app you would include `script( src='/assets/search.js' )` and `link( href='/assets/search.css' )` and Ezel will wire up the rest.
