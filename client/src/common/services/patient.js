
angular.module('todomvcApp')

.factory('Patient', ['$resource', function($resource) {
  return $resource(serviceUrls.patients + '/:id', {
      todoId: '@_id'
    },
    {
      update: {
        method: 'PUT'
      }
    }
  );
}]);