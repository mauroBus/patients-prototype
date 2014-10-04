
angular.module('patientsApp.urlConfig', [])

// mode: { 'mock' || 'dev' || 'prod' }
.value('mode', 'mock')

.service('Urls', ['mode', function (mode) {
  var urls = {
    mock: {
      patients: 'mocks/patients/:id.json'
    },
    dev: {
      // TODO: list of service urls...
      patients: 'api/patients'
    }
  };

  return urls[mode];

}]);
