'use strict';

angular.module('preTrackApp')
  .controller('AdminCtrl', ['$scope', '$http', 'index', 'MainService', function ($scope, $http, index, MainService) {
    $scope.sending = false;
    var _placeNum = 0;

    $scope.getTrackData = function () {
      MainService.getTrackData().then(function(data) {
        $scope.trackItems = data;
        $scope.trackItems.forEach(function(item) {
          if (item.type === 'place') {
            item.placeNum = _placeNum++;
          }
        });

        if (index !== 'all') {
          $scope.data = $scope.trackItems[index];
        }
      });
    };

    $scope.save = function () {
      var items = $scope.trackItems;
      console.log(items);

      $scope.sending = true;

      MainService.updateTrackData(items)
      .success(function(resData) {
        $scope.sending = false;
        window.location.href = '/';
      }).error(function(e) {
        $scope.sending = false;
        window.alert(e)
      });
    };

    $scope.addImage = function(image_urls) {
      image_urls.push('');
    }
    $scope.deleteImage = function(image_urls, idx) {
      image_urls.splice(idx, 1);
    }

  }]);
