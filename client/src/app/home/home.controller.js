'use strict';

angular.module('patientsApp')

.controller('HomeCtrl', [
          '$scope', '$timeout', '$location'
  function($scope,   $timeout,   $location) {
    $scope.patients = [];
    $scope.newPatient = '';
    $scope.status = $location.search().q || '';
  }
]);
