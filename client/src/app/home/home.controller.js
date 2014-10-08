
angular.module('patientsApp')

.controller('HomeCtrl', [
          '$scope', '$rootScope', '$timeout', '$location', 'Patient',
  function($scope,   $rootScope,   $timeout,   $location,   Patient) {
    var scope = {
      remove: function(index, $event) {
        var patientToRem = $rootScope.patients[index];
        Patient.delete({dni: patientToRem.dni}, function() { // success cbk
          $rootScope.patients.splice(index, 1);
        });

        $event.stopPropagation();
      }
    };

    $rootScope.patients = Patient.query();

    angular.extend($scope, scope);
  }
]);
