
angular.module('patientsApp.services', ['ngResource'])

.factory('Patient', [
          '$resource', 'Urls',
  function($resource,   Urls) {
    return $resource(Urls.patients, { id: '@id' }, {
      query: {
        method: 'GET',
        isArray:true
        // transformResponse: function(data, header) {
        //   return angular.fromJson(data).patients;
        // }
      }
    });
  }
]);

