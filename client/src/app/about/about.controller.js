
angular.module('patientsApp')

.controller('AboutCtrl', ['$scope', function($scope) {
    $scope.concepts = [
      'Angular',
      'Jasmine',
      'NodeJS'
    ];

    $scope.authors = {
      backend: 'Gabriel Lopez <glopez@devspark.com>',
      frontend: 'Mauro Buselli <mbuselli@devspark.com>',
      testing: 'Lisandro Falconi <lfalconi@devspark.com>'
    };
  }
]);
