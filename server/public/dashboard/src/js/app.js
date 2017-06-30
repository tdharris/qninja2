'use strict';

// Declare app level module which depends on views, and components
angular.module('dashboard', [
	'feeds'
])
.controller('dash', ['$scope', function($scope) {
  $scope.greeting = 'Hola!';
}]);