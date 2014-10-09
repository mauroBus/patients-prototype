# Angular and Cordova (with Ionic framework) FrontEnd

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
In  the client level, the main folder contains basically the Cordova directory structure:
```
client/
|-- config.xml
|-- hooks/
|-- node_modules/
|-- src/
|-- www/
|-- vendor/
|-- platforms/
|   |-- android/
|   |-- ios/
|-- plugins/
|-- scss/
```

* `config.xml` Cordova application's metadata.
* `node_modules` contains build tasks for Gulp along with other, user-installed, Node packages.
* `www` contains the build results.
* `src` contains the application's sources (js/html/css files).
* `vendor` contains external dependencies for the source code of the application.
* `hooks` Cordova folder that contains scripts used to customize cordova commands.
* `platforms` Cordova folder with native application platforms.
* `plugins` Any added plugins for Cordova.
* `scss` Ionic folder intended to overwrite the sass styles used by default for Ionic framework.

Inside the src folder resides the source code of the web application. The folder structure look like this:
```
src/
|-- index.html
|-- app/
|   |-- app.js
|   |-- about/
|   |   |-- about.js
|   |   |-- about.html
|   |   |-- about.controller.js
|   |   |-- styles.less
|   |-- home/
|   |   |-- home.js
|   |   |-- home.html
|   |   |-- home.controller.js
|   |   |-- styles.less
|-- assets/
|   |-- img/
|   |-- less/
|   |   | -- /app.less
|   |-- mocks/
|   |   | -- patients.json
|-- common/
|   |-- urlconfig.js
|   |-- directives/
|   |   |-- go/
|   |   |-- .../
|   |-- services/
|   |   |-- patient.js
```

* `app/` This folder contains all the views and modules
* `app/app.js` This is the main app file. It setup the main app module.

### Build

The default Gulp task `gulp default` will build (checks the javascript (lint), and builds distributable files).

### Continuous Building
The watch gulp task will monitor the source files and run the default build task every time a file changes: `gulp watch`.

### Building release code
You can build a release version of the app, with minified files. The gulp task to do it is `gulp build --production`.
