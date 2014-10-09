
angular.module('patientsApp')

.controller('HeaderCtrl', [
          '$scope', '$location', '$routeParams',
  function($scope,   $location,   $routeParams) {
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
        if ($routeParams.dni) {
          return 'Patient dni:' + $routeParams.dni + ' Info';
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
      }
    };

    angular.extend($scope, scope);
  }
]);
