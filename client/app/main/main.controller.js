'use strict';

angular.module('preTrackApp')
  .controller('MainCtrl', ['$scope', '$http', '$location', 'step', 'MainService', function($scope, $http, $location, step, MainService) {

    $scope.formData = {};
    $scope.spotNum = step || 999;

    var _placeNum = 0;

    $scope.getTrackData = function () {
      $scope.sending = true;

      MainService.getTrackData().then(function(data) {
        $scope.trackItems = data;
        $scope.trackItems.forEach(function(item) {
          if (item.type === 'place') {
            item.placeNum = _placeNum++;
          }
        });
      });
    };

    $scope.editIndex = function(index) {
      $location.path('/edit/'+index);
    };

    $scope.resolveImageSize = function(length, idx) {
      var full = 280;
      var half = full / 2;
      if (length === 1) {
        return px(full);
      } else if (length === 2) {
        return px(half);
      } else if (length > 2) {
        if (idx === 0) {
          return px(full);
        } else {
          return px(full / (length - 1));
        }
      }
    };

    var px = function(num) {
      return num + 'px';
    }

  }]);
