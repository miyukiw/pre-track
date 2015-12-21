'use strict';

angular.module('preTrackApp')
  .controller('MainCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.goto = function(path) {
      $location.path(path);
    }
  }]);
