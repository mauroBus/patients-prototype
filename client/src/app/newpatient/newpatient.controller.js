
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
