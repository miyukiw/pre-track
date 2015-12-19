'use strict';

angular.module('preTrackApp')
  .controller('AdminCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.sending = false;
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

    $scope.save = function () {
      var json = $scope.trackItems;
      console.log(json);

      $scope.sending = true;

      $http({
        url: '/api/track',
        method: 'POST',
        data: {
          items: json
        }
      }).success(function(resData) {
        $scope.sending = false;
        window.alert('ok')
        window.location.href = '/';
      });
    };

    $scope.addImage = function(image_urls) {
      image_urls.push('');
    }
    $scope.deleteImage = function(image_urls, idx) {
      image_urls.splice(idx, 1);
    }

  }]);
