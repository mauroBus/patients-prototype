
angular.module('patientsApp')

.controller('NewPatientCtrl', [
          '$scope', '$rootScope', '$location', 'Patient',
  function($scope,   $rootScope,   $location,   Patient) {
    var scope = {
      newPatient: {
        firstName: '',
        lastName: '',
        dni: '',
        dob: ''
      },

      successfulyCreated: false,
      cancelBtnTxt: 'Cancel and Go Back',

      addPatient: function() {
        if (!$rootScope.patients) {
          $rootScope.patients = [];
        }

        var newP = Patient.save($scope.newPatient);

        newP.$promise.then(function() {
          $rootScope.patients.push(newP);
          $scope.successfulyCreated = true;
        });
      }
    };

    angular.extend($scope, scope);
  }
]);
