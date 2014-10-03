
angular.module('patientsApp')

.config(['$provide', function($provide) {
    $provide.value('serviceUrls', {
      // TODO: list of service urls...
      patients: 'api/patients'
    });
  }
]);
