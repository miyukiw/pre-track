'use strict';

angular.module('preTrackApp')
  .controller('TrackCtrl', ['$scope', '$rootScope', '$http', '$location', 'id', 'step', 'MainService', function($scope, $rootScope, $http, $location, trackId, step, MainService) {

    $rootScope.pageTitle = '';
    $rootScope.contextMenu = [
      {title: 'Add Spot', path: '/track/' + trackId + '/add'},
      {title: 'Edit All', path: '/track/' + trackId + '/edit'}
    ];

    $scope.formData = {};
    $scope.spotNum = step || 999;

    var _placeNum = 0;

    $scope.getTrackData = function () {
      $scope.sending = true;

      MainService.getTrackData(trackId).then(function(data) {
        $rootScope.pageTitle = data.title;
        $scope.trackItems = data.items;
        $scope.trackItems.forEach(function(item) {
          if (item.type === 'place') {
            item.placeNum = _placeNum++;
          }
        });
      });
    };

    $scope.editIndex = function(index) {
      $location.path('/track/' + trackId + '/edit/' + index);
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
