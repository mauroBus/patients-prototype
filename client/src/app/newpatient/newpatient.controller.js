
angular.module('patientsApp')

.controller('NewPatientCtrl', [
          '$scope', '$rootScope', '$location', 'Patient',
  function($scope,   $rootScope,   $location,   Patient) {
    var scope = {
      newPatient: {
        name: '',
        lastName: '',
        dni: '',
        birthday: ''
      },

      successfulyCreated: false,
      cancelBtnTxt: 'Cancel and Go Back',

      go: function(path) {
        $location.path(path);
      },

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
