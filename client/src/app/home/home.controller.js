
angular.module('patientsApp')

.controller('HomeCtrl', [
          '$scope', '$rootScope', '$timeout', '$location', 'Patient',
  function($scope,   $rootScope,   $timeout,   $location,   Patient) {
    var scope = {
      newPatient: '',
      status: $location.search().q || ''
    };

    $rootScope.patients = Patient.query();

    angular.extend($scope, scope);
  }
]);
