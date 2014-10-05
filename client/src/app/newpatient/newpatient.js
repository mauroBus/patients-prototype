
angular.module('patientsApp')

.config([ '$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/newpatient', {
      templateUrl: 'newpatient/newpatient.html',
      controller: 'NewPatientCtrl'
    });
  }
]);
