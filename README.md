# Ezel

![image](https://f.cloud.github.com/assets/555859/1462363/5ce5d010-44f4-11e3-99cd-e7a2f4f0c06d.png)

A boilerplate for Backbone projects that share code server/client, render server/client, and scale through modular architecture. Used at [Artsy](http://artsy.net) to bootstrap new projects, see [our blog post](http://artsy.github.io/blog/2013/11/30/rendering-on-the-server-and-client-in-node-dot-js/) on it.

## Introduction

Ezel makes it easy to write and maintain Backbone apps that run in the browser and on the server using [Node.js](http://nodejs.org/). Built on popular libraries like [Express](http://expressjs.com/), [Backbone](http://backbonejs.org/), and [Browserify](http://browserify.org/), Ezel isn't a framework or library of its own, but rather a boilerplate of libraries and patterns that can be leveraged or abandoned as needed.

Ezel has three main philosophies...

### Modularity

Instead of managing growing complexity in projects by imposing rigid monolithic structure, Ezel encourages breaking your project up into smaller pieces that are easy to maintain and refactor independently.

### Flexiblity

Don't get locked into choosing between single page app or fully server-side rendered pages. Ezel's modular structure and shared server/client code makes it easy to decide what patterns and tools are best on a case by case basis.

### Run on Both Sides

Ezel [shares javascript modules that run in the browser and on the server](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/). This means you can [optimize initial page load](https://blog.twitter.com/2012/improving-performance-twittercom) and SEO by sharing templates that can render on the server or client. This also makes it easy to test all of your code in Node.js using [benv](http://github.com/artsy/benv) and [zombie](http://zombie.labnotes.org/) for robust, fast, and easy to set up tests.

## Getting Started

### Installation

1. Install [Node.js](http://nodejs.org/)
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

At its heart Ezel is just a Backbone app and therefore relies on an external API as its data source. This can come in a [variety](http://expressjs.com/) [of](https://github.com/intridea/grape) [forms](http://flask.pocoo.org/) and it's up to you to choose the best technology to serve your data over HTTP.

Once you understand how the above tools work, diving into Ezel is just a matter of understanding its patterns. After this, when you're ready, you can delete all of the example files and start clean by running `make clean`.

## Project vs. Apps vs. Components

Monolithic frameworks tend to organize your code by type such as /views, /stylesheets, /javascripts, etc. As your app grows larger this becomes an awkward and unmaintainable way to delineate parts of your project. Ezel encourages grouping files into conceptual pieces instead of by type.

There are three different levels of this organization:

### Project

Refers to the root, "global", level and contains the initial setup/server code and project-wide modules such as models, collections, and libraries. Setup code is extracted into /lib/setup to encourage modularizing and testing your setup code.

### Apps

Apps are small express applications that are [mounted into the main project](http://vimeo.com/56166857). What distinguishes apps from one another is that they conceptually deal with a certain section of your website, and are often separated by a full page-refresh. As such an app could be a complex thick-client "search" app, or a simple static "about" page.

Apps should strive to be self-contained and shouldn't require into other apps. However, apps will often need project-level modules so requiring into components, models, collections and libraries are fine. It's also encouraged to namespace your CSS classes inside an app by the app name to avoid conflicts, e.g. apps/user may use `h1.user-header`.

The organization of these apps are up to you, for a simple app you may put all of your code into one express instance exported in a single index.js file. More complex apps may have their own /routes, /stylesheets, etc. folders or even look like its own Ezel project with components and sub-apps.

Large web projects often have a wide range of needs on a case by case basis. Instead of trying to solve every problem with the same architecture, Ezel remains flexible and modular so you can pick the right tools and patterns for the job.

### Components

Components are portions of UI re-used across apps and are simply a folder containing a mix of stylesheets, templates, and client-side code that can be required piece-meal. These can be thought of like a [jQuery UI widget](http://jqueryui.com/), [Bootstrap component](http://getbootstrap.com/2.3.2/components.html), [Backbone view](http://backbonejs.org/#View), or [component.js](http://tjholowaychuk.com/post/27984551477/components) component. Components can be as simple a stylesheet and template, more complex like an autocomplete widget, or even a massive modal window with many sub-components.

Components, like apps, should strive to be self contained and shouldn't require into other components or apps. It's also encouraged to namespace your CSS classes in a component by the component name to avoid conflicts, e.g. components/autocomplete may use `li.autocomplete-list-item`.

## Models & Collections

Model code is meant to work on the server and client so it must strictly be domain logic around your data. Model code can't use APIs only available to the browser or node such as accessing the file system or the `XMLHttpRequest` object.

Backbone.sync is used as a layer over HTTP accessible on both sides. Any HTTP requests made in model and collection code therefore must be wrapped in a Backbone class or used by an anonymous instance e.g. `new Backbone.Model().fetch({ url: '/api/system/up', success: //... })`.

## Libraries

Libraries are a place to store modules that are used across apps and don't pertain to domain logic or UI that can be better handled by models or components. These can be server only such as a library zipping uploaded files, browser-only such as an HTML5 Canvas library, or even shared such as a date parsing library that can be used on both the server and client.

## Testing

Tests are broken up into project-level, app-level, and component-level tests that are run together in `make test`. This boilerplate comes stocked with a suite of tests for the Github API example, so please take a look around for examples.

### Project-level Tests

Project-level tests involve any library, model, or collection tests. Because Ezel model code can run on the server you can easily test it in node without any extra ceremony and testing these parts should be straight-forward. In the case that you need to test model or collection fetching/persisting it's encouraged to stub Backbone.sync.

### Component-level Tests

Components should have tests inside their own /test folders to try to be self-contained. Because components contain view code meant to run in a browser you can use [benv](http://github.com/artsy/benv) to set up a fake browser environment and require these modules for unit testing like any other module.

### App-level Tests

App-level tests can come in a number of different forms, but often involve some combination of route, template, client-side, and integration tests. Like components, apps should have their own tests under /test folders. Given that apps can vary in complexity and number of components they use, it's up to you to decide how to structure and test their parts.

Some common practices are to split up your route handlers into libraries of functions that pass in stubbed request and response objects. Templates can be directly compiled with jade and asserted against the generated html. Client-side code can be unit tested in node using [benv](http://github.com/artsy/benv) (Backbone views can help wrap code into testable methods). Finally a suite of integration tests use [Zombie](http://zombie.labnotes.org/) and boot up a version of the project with a fake API server found under /test/helpers/integration.

All of these techniques ensure your code remains decoupled, your tests run fast, and you stay happy and productive.

## Build Scripts & Configuration

Ezel uses simple configuration and build tools that are standard with most environments.

A [Makefile](http://en.wikipedia.org/wiki/Make_(software) designates build commands. When more complex build scripts are needed it's encouraged to wrap them in libraries that can be run via `node lib/script.js`.

Configuration is handled entirely by [environment variables](http://en.wikipedia.org/wiki/Environment_variable). For ease of setup there is a /config.js file that wraps `process.env` and declares sensible defaults for development.

## Asset Pipeline

Ezel's asset building is mostly handled by [Browserify](https://github.com/substack/node-browserify) and [Stylus](https://github.com/learnboost/stylus) with middleware for development and a `make assets` task to output more production ready files to public/assets. Place your asset packages in /assets, point your script and style tags to /assets/<filename> in your views, and Ezel will wire the rest up for you.

Ezel's focus on modularity makes it easy to build up light-weight asset packages that are focused for your needs. This combined with rendering on the server makes it a great option for optimizing initial page load.

A common pattern would be to build asset packages per-app. For instance you may have a "search" app that uses assets from a layout component, an autocomplete component, and the search app's own client-side code and stylesheets. In this case you would create an /assets/search.styl that imports stylesheets from components/layout, components/autocomplete and app/search/stylesheets, and ditto for javascripts. In the view of the search app you would include `script( src='/assets/search.js' )` and `link( href='/assets/search.css' )` and Ezel will wire up the rest.
