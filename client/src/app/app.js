angular.module('patientsApp', [
  'patientsApp.services',
  'patientsApp.urlConfig',
  'ngRoute',
  'templates.app',
  'templates.common'
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

.controller('RouteController', [
          '$scope', '$route', '$routeParams', '$location',
  function($scope,   $route,   $routeParams,   $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
  }
]);
