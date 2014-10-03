'use strict';

angular.module('patientsApp', [
  'ngResource',
  'ngRoute'
])

angular.module('patientsApp')

.config([ '$stateProvider', '$urlRouterProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider

      .when('/', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl',
        reloadOnSearch: false
      })

      // default on error:
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  }
]);
