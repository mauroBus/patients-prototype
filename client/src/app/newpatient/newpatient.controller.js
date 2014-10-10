
angular.module('patientsApp')

.controller('NewPatientCtrl', [
          '$scope', '$rootScope', '$location', 'Patient', 'Statistics',
  function($scope,   $rootScope,   $location,   Patient,   Statistics) {
    var scope = {
      newPatient: {
        firstName: '',
        lastName: '',
        dni: '',
        dob: ''
      },

      successfulyCreated: false,
      unsuccessfulyCreated: false,

      cancelBtnTxt: 'Cancel and Go Back',

      addPatient: function() {
        if (!$rootScope.patients) {
          $rootScope.patients = [];
        }

        var newP = Patient.save($scope.newPatient);

        newP.$promise.then(
          function() { // success cbk
            $rootScope.patients.push(newP);
            $scope.successfulyCreated = true;
            $scope.unsuccessfulyCreated = false;
            $scope.newPatient.firstName = '';
            $scope.newPatient.lastName = '';
            $scope.newPatient.dni = '';
            $scope.newPatient.dob = '';

            Statistics.patientCreated();
          },
          function() { // error cbk
            $scope.unsuccessfulyCreated = true;
            $scope.successfulyCreated = false;
          }
        );
      },

      today: new Date()
    };

    angular.extend($scope, scope);
  }
]);
