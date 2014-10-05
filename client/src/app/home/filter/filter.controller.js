
angular.module('patientsApp')

.controller('FilterCtrl', [
          '$scope', '$rootScope',
  function($scope,   $rootScope) {
    $scope.searchTxt = $rootScope.searchTxt = '';

    $scope.filter = function() {
    };
  }
]);
