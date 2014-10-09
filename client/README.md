# Angular and Cordova (Ionic) FrontEnd

This project is an application skeleton trying to be a proposal to set up a complex [AngularJS](http://angularjs.org/) web app using [Ionic](http://ionicframework.com/) and [Cordova](http://cordova.apache.org/) to develop with native mobile support.
The main idea is to use it to quickly bootstrap the Angular & Cordova webapp projects and dev environment for native mobile projects.

The folders contains a sample AngularJS application to handle a list of patients. And it is preconfigured to install the Angular framework and a bunch of development tools for instant web development gratification.
This repo just shows how to wire some modules, controllers, directives, services and views together.

## Stack

* AngularJS and dependencies.
* [Ionic](http://ionicframework.com/) Framework for Cordova.
* CSS based on [Twitter's Bootstrap](http://getbootstrap.com).
* jQuery.

## Installation

### Platform

You need to install Node.js and then the development tools. Node.js comes with a package manager called [npm](http://npmjs.org) for installing NodeJS applications and libraries.

* Install [node.js](http://nodejs.org/download/)

### Server App

The backend application server is a NodeJS application that relies upon some 3rd Party npm packages. It is needed to install the server side dependencies before launching the application.

### Client App

The client application is a straight HTML/Javascript application but the development process uses a Node.js build tool called [Gulp.js](http://gulpjs.com). Gulp has beeing used with some tasks that relies upon some 3rd party libraries that we need to install as local dependencies using npm.

1. **Automatic Install:** There is an utility `npm` command that installs the manual steps for you. You can run `npm start` and that's it. This command was built to simplify the installation process.

2. **Manual Install:**

* Install local dependencies (inside the ´/client´ folder):
    ```
    cd client
    npm install
    ```
  (This will install the dependencies declared in the client/package.json file)

* Install gulp and bower tools as globals if you do not have them installed.
    ```
    npm install -g bower gulp
    ```

* Finally, install source code dependencies (inside the ´/client´ folder):
    ```
    cd client
    bower install
    ```
  (This will install the dependencies declared in the client/bower.json file)


After the installation, it is needed to build the code to get the compiled final version. It is explained in the next section.


## Build

This project has a build system focused on AngularJS apps and tightly integrated with other tools commonly used:

* Npm (Node Package Manager) to install the building dependencies.
* [Bower](http://bower.io/) package manager.
* Powered by [Gulp.js](http://gulpjs.com/).
* Build supporting JS optimization and minification, LESS compilation to CSS, AngularJS templates minification, Hint support for linting Javascript files, etc.
* Twitter's bootstrap with LESS templates processing integrated into the build.
* Ionic 'serve' command integrated in the Gulp tasks that runs the node server along with the ionic framework.


To compile the source code into a set of files that can be reproduced in a browser, we need to execute the next command.
    ```
    gulp build
    ```
This command creates the folder `client/www` with all the files needed to run the application.

That's all what we need to see the application running. In the next section I explain how to develop and understand the app source code.


## Development

### Folders structure
In  the client level, the main folder contains all the client-side Ionic and AngularJS application with the following structure:
* `node_modules` contains build tasks for Gulp along with other, user-installed, Node packages.
* `www` contains the build results.
* `src` contains application's sources.
* `vendor` contains external dependencies for the source code of the application.
* ``

### Default Build
The default grunt task will build (checks the javascript (lint), runs the unit tests (test:unit) and builds distributable files) and run all unit tests: `grunt` (or `grunt.cmd` on Windows).  The tests are run by karma and need one or more browsers open to actually run the tests.
* `cd client`
* `grunt`
* Open one or more browsers and point them to [http://localhost:8080/__test/].  Once the browsers connect the tests will run and the build will complete.
* If you leave the browsers open at this url then future runs of `grunt` will automatically run the tests against these browsers.

### Continuous Building
The watch grunt task will monitor the source files and run the default build task every time a file changes: `grunt watch`.

### Build without tests
If for some reason you don't want to run the test but just generate the files - not a good idea(!!) - you can simply run the build task: `grunt build`.

### Building release code
You can build a release version of the app, with minified files.  This task will also run the "end to end" (e2e) tests.
The e2e tests require the server to be started and also one or more browsers open to run the tests.  (You can use the same browsers as for the unit tests.)
* `cd client`
* Run `grunt release`
* Open one or more browsers and point them to [http://localhost:8080/__test/].  Once the browsers connect the tests will run and the build will complete.
* If you leave the browsers open at this url then future runs of `grunt` will automatically run the tests against these browsers.
