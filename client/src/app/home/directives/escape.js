/**
 * Directive that executes an expression when the element it is applied to gets
 * an `escape` keydown event.
 */
angular.module('patientsApp')

.directive('patientEscape', function() {
  var ESCAPE_KEY = 27;
  return function(scope, elem, attrs) {
    elem.bind('keydown', function (event) {
      if (event.keyCode === ESCAPE_KEY) {
        scope.$apply(attrs.patientEscape);
      }
    });
  };
});
