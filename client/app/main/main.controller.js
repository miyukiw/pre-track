'use strict';

angular.module('preTrackApp')
  .controller('MainCtrl', ['$scope', '$http', 'step', function ($scope, $http, step) {

    $scope.formData = {};
    $scope.sending = false;

    $scope.spotNum = step || 999;

    var _placeNum = 0;

    $scope.getTrackData = function () {
      $scope.sending = true;

      $http({
        url: '/api/track/',
        method: 'GET',
        params: {
          id: 1
        }
      }).success(function(resData) {
        $scope.sending = false;
        $scope.trackItems = resData.items;
        $scope.trackItems.forEach(function(item) {
          if (item.type === 'place') {
            item.placeNum = _placeNum++;
          }
        })
      });
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
