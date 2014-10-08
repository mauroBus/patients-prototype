
angular.module('patientsApp')

.controller('PatientCtrl', [
          '$scope', '$routeParams', 'Patient',
  function($scope,   $routeParams,   Patient) {
    var scope = {
      patient: Patient.get({dni: $routeParams.dni})
    };

    angular.extend($scope, scope);
  }
]);
