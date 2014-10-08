
angular.module('patientsApp')

.directive('patientInfo', function(Patient) {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'directives/patient-info/patient-info.html',

    link: function(scope, elem, attrs) {

      scope.editting = false;
      scope.copy = {};

      scope.edit = function() {
        scope.editting = true;
        scope.copy = {
          firstName: scope.patient.firstName,
          lastName: scope.patient.lastName,
          dni: scope.patient.dni,
          dob: scope.patient.dob
        };
      };

      scope.save = function() {
        // scope.patient.$update();
        Patient.update({dni: scope.patient.dni}, scope.patient);
        scope.editting = false;
        // angular.copy(scope.copy, scope.patient);
      };

      scope.cancelEdition = function() {
        scope.editting = false;
        angular.copy(scope.copy, scope.patient);
      };

    }
  };
});
