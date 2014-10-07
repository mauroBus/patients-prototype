
angular.module('patientsApp')

.config([ '$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/about', {
      templateUrl: 'about/about.html',
      controller: 'AboutCtrl'
    });
  }
]);
