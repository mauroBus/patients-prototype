
angular.module('patientsApp')

.controller('NewPatientCtrl', [
          '$scope', '$location', 'Patient',
  function($scope,   $location,   Patient) {
    var scope = {
      newPatient: {
        name: '',
        lastName: '',
        dni: '',
        birthday: ''
      },

      addPatient: function() {
        $scope.newPatient.id = Patient.save($scope.newPatient);
        $scope.$parent.patients.push($scope.newPatient);
      }
    };

    angular.extend($scope, scope);
  }
]);
