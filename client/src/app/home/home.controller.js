
angular.module('patientsApp')

.controller('HomeCtrl', [
          '$scope', '$timeout', '$location',
  function($scope,   $timeout,   $location) {
    $scope.patients = [{
          id: 1,
          name: 'Alice',
          lastName: 'Cooper',
          dni: '33555585',
          birthday: '16 Ago 1888'
        }, {
          id: 2,
          name: 'Alan',
          lastName: 'Poe',
          dni: '30222555',
          birthday: '5 Ago 1987'
        }, {
          id: 3,
          name: 'Mark',
          lastName: 'Zukemberg',
          dni: '25666999',
          birthday: '11 Ago 1960'
        }, {
          id: 4,
          name: 'Jhon',
          lastName: 'Doe',
          dni: '16555888',
          birthday: '20 Ago 1988'
        }
      ];

    $scope.newPatient = '';
    $scope.status = $location.search().q || '';
  }
]);
