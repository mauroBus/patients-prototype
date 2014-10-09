angular.module('patientsApp', [
  'ui.bootstrap',
  'patientsApp.services',
  'patientsApp.urlConfig',
  'ngRoute',
  'ngAnimate',
  'templates.app',
  'templates.common',
  'ionic'
]);

angular.module('patientsApp')

.config([ '$routeProvider', '$locationProvider',
  function($routeProvider,   $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/home'
      });

    // $locationProvider.html5Mode(true);
  }
])


/** ionic config **/
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});
