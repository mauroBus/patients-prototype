
angular.module('patientsApp')

.controller('HomeCtrl', [
          '$scope', '$timeout', '$location', 'Patient',
  function($scope,   $timeout,   $location, Patient) {
    var scope = {
      patients: Patient.query(),
      newPatient: '',
      status: $location.search().q || ''
    };

    angular.extend($scope, scope);
  }
]);
