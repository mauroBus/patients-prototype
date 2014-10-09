
angular.module('patientsApp.services', ['ngResource'])

.factory('Patient', [
          '$resource', 'Urls',
  function($resource,   Urls) {
    return $resource(Urls.patients + '/:dni', { dni: '@dni' }, {
      query: {
        method: 'GET',
        isArray:true,
        params: {},
        transformResponse: function(data, header) {
          var jsonData = angular.fromJson(data);
          jsonData.forEach(function(patient){
            patient.dob = new Date(patient.dob);
          });
          return jsonData;
        }
      },
      save: {
        method: 'POST',
        params: {
          dni: ''
        }
      },
      update: {
        method: 'PUT',
        params: {
          dni: ''
        }
      },
      get: {
        method: 'GET',
        transformResponse: function(data, header) {
          var patient = angular.fromJson(data);
          patient.dob = new Date(patient.dob);
          return patient;
        }
      }
    });
  }
]);

