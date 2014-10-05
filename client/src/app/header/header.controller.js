
angular.module('patientsApp')

.controller('HeaderCtrl', [
          '$scope', '$location',
  function($scope,   $location) {
    var scope = {
      displayNewPatient: function() {
        return $location.path() === '/newpatient';
      }
    };

    angular.extend($scope, scope);
  }
]);
