angular.module('patientsApp', [
  'ngResource',
  'ngRoute',
  'templates.app',
  'templates.common'
]);

angular.module('patientsApp')

.config([ '$routeProvider', '$locationProvider',
  function($routeProvider,   $locationProvider) {

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
])

.controller('MainController', [
          '$scope', '$route', '$routeParams', '$location',
  function($scope,   $route,   $routeParams,   $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
  }
]);
