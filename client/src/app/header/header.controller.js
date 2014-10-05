
angular.module('patientsApp')

.controller('HeaderCtrl', [
          '$scope', '$location',
  function($scope,   $location) {
    var scope = {
      showHomeLink: function() {
        return $location.path() !== '/home';
      },
      showNewPatientLink: function() {
        return $location.path() !== '/newpatient';
      },
      showAboutLink: function() {
        return $location.path() !== '/about';
      }
    };

    angular.extend($scope, scope);
  }
]);
