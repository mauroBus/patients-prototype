
angular.module('patientsApp')

.controller('PatientCtrl', [
          '$scope', '$rootScope', '$routeParams', 'Patient',
  function($scope,   $rootScope,   $routeParams, Patient) {
    var scope = {
      patient: Patient.get({dni: $routeParams.dni})
    };

    angular.extend($scope, scope);
  }
])

.directive('patientInfo', function() {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'patient/directive/patient-info.html',
    // link: function(scope, elem, attrs) {
    //   scope.patient = '';
    // }
  };
})

;
