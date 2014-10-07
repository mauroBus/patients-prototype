
angular.module('patientsApp')

.config([ '$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/patient/:dni', {
      templateUrl: 'patient/patient.html',
      controller: 'PatientCtrl'
      // resolve: {
      //   patient: $rootScope.patients[0]
      // }
    });
  }
]);
