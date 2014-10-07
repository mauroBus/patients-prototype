
angular.module('patientsApp.services', ['ngResource'])

.factory('Patient', [
          '$resource', 'Urls',
  function($resource,   Urls) {
    return $resource(Urls.patients + '/:dni', { dni: '@dni' }, {
      query: {
        method: 'GET',
        isArray:true,
        params: {}
        // transformResponse: function(data, header) {
        //   return angular.fromJson(data).patients;
        // }
      },
      save: {
        method: 'POST',
        params: {
          dni: ''
        }
      }
    });
  }
]);

