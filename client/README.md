# Angular and Cordova (with Ionic framework) FrontEnd

This project is an application skeleton trying to be a proposal to set up a complex [AngularJS](http://angularjs.org/) web app using [Ionic](http://ionicframework.com/) and [Cordova](http://cordova.apache.org/) to develop with native mobile support.
The main idea is to use it to quickly bootstrap the Angular & Cordova webapp projects and dev environment for native mobile projects.

The folders contains a sample AngularJS application to handle a list of patients. And it is preconfigured to install the Angular framework and a bunch of development tools for instant web development gratification.
This repo just shows how to wire some modules, controllers, directives, services and views together.

## Stack

* AngularJS.
    * Angular Bootstrap for Boostrap components.
    * Angular Resource for RESTful comunication with the back end.
    * Angular Route for handling the transition between several screens.
    * Nv-D3 to handle the D3 charts with Angular directives.
    * Angularjs-Nvd3-directives a set of custom directives to draw charts.
    * Angular Templatecache for cache all html templates in Angular modules.
* D3 for chart generation
* [Ionic](http://ionicframework.com/) Framework for Cordova bootstrapping.
* CSS based on [Twitter's Bootstrap](http://getbootstrap.com).

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
* `vendor` contains external dependencies (Bower destination folder) for the application's source code.
* `hooks` Cordova folder that contains scripts used to customize cordova commands.
* `platforms` Cordova folder with native application platforms.
* `plugins` Any added plugins for Cordova.
* `scss` Ionic folder intended to overwrite the sass styles used by default for Ionic framework.

Inside the src folder resides the source code of the web application. The folder structure look like this:
```
src/
|-- index.html             <-- App layout file (the main html template file of the app).
|-- app/                   <-- Container for all the views and modules
|   |-- app.js             <-- Main application file that setup the main module.
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
|   |-- ...                <-- Other application views.
|-- assets/                <-- LESS / Images / mocks files.
|   |-- img/               <-- App images container.
|   |-- less/              <-- App LESS styles container.
|   |   | -- /app.less
|   |-- mocks/             <-- Service mocks container
|   |   | -- patients.json
|-- common/                <-- Common directives / services / views that are shared in the whole app.
|   |-- urlconfig.js       <-- Module to configurate the backend services url's. It allows modes to switch between real url services ('dev') or usign the mocks json files ('mock').
|   |-- directives/
|   |   |-- go/
|   |   |   | ...
|   |   |-- patient-info/
|   |   |   |-- patient-info.html
|   |   |   |-- patient-info.js
|   |   |   |-- styles.less
|   |   |-- .../
|   |-- services/
|   |   |-- patient.js
|   |   |-- ...
```

### Build

The default Gulp task `gulp default` will build (checks the javascript (lint), and builds distributable files).
* `build` command execute: `build-index`, `build-js` and `build-css` sub commands.
* `build-index` generate the index.html file.
* `build-js` generate a index.js file with all the contents of the app. This file contains a cache with all the html templates.
* `build-index` generate the index.html file.

### Continuous Building
The watch gulp task will monitor the source files and, every time a file changes it runs a particuar task depending of the type of the changed file: `gulp watch`. When a `js` or `html` file is changed, the `build-js` task is executed. When the changed file type is `.less`, so the `build-css` task get executed. All styles are concatenated and sent to the styles.css file.

All the results are sent to the `www` folder. Which has the following structure:
```
client/
|-- index.html
|-- css/
|-- fonts/
|-- img/
|-- js/
|   |-- index.js    <-- All app js files and also two special angular modules for caching the html templates.
|   |-- angular.js  <-- Contains angular and its dependencies.
|-- mocks/
```



### Building release code
You can build a release version of the app, with minified files. The gulp task to do it is `gulp build --production`.

### Building and Deploying with Cordova and Ionic

If you want to test the application in either an android device or simulator, you need to install some utils.
You can find a good installation guide [here](http://learn.ionicframework.com/videos/windows-android).
You will need:

1.  Download and Install Java and set the environment variable
2.  Download and Install Apache Ant
3.  Download and Install the Android SDK and set the environment variables
4.  Install Cordova: `$ npm install -g cordova`
5.  Install Ionic: `$ npm install -g ionic`
6.  Add a platform: `$ ionic platform add android`
7.  Build: `ionic build android`
8.  Deploy: `ionic emulate android` (emulation) or `ionic run android` (connected android device)
9.  See it in a browser: `gulp serve` or `ionic serve`

# Useful Info

* Cordova
