'use strict';

angular.module('preTrackApp')
  .controller('MainCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.goto = function(path) {
      $location.path(path);
    }

    $scope.$on('$locationChangeStart', function(event) {
      window.scroll(0, 0);
    });
  }]);
