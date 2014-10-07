
angular.module('patientsApp')

.controller('AboutCtrl', ['$scope', function($scope) {
    $scope.concepts = [
      'Angular',
      'Jasmine',
      'NodeJS'
    ];
  }
]);
