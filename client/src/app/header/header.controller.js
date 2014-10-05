
angular.module('patientsApp')

.controller('HeaderCtrl', [
          '$scope', '$location',
  function($scope,   $location) {
    var scope = {

      subPageName: function() {
        if ($location.path() === '/home') {
          return 'Home Page';
        }
        if ($location.path() === '/newpatient') {
          return 'New Patient Page';
        }
        if ($location.path() === '/about') {
          return 'About Page';
        }
      },

      showHomeLink: function() {
        return $location.path() !== '/home';
      },

      showNewPatientLink: function() {
        return $location.path() !== '/newpatient';
      },

      showAboutLink: function() {
        return $location.path() !== '/about';
      },

      go: function(path) {
        $location.path(path);
      }
    };

    angular.extend($scope, scope);
  }
]);
