'use strict';

angular.module('preTrackApp')
  .controller('TrackAddSpotCtrl', ['$scope', '$rootScope', '$http', '$location', 'id', 'MainService', function ($scope, $rootScope, $http, $location, trackId, MainService) {
    $scope.isAdd = true;
    $rootScope.backPath = '/track/' + trackId;

    $scope.data = {
      type: 'place',
      image_urls: []
    };

    $scope.addImage = function(image_urls) {
      image_urls.push('');
    }
    $scope.deleteImage = function(image_urls, idx) {
      image_urls.splice(idx, 1);
    }
    
    $scope.getTrackData = function () {
      MainService.getTrackData(trackId).then(function(data) {
        $rootScope.pageTitle = data.title;
        $scope.trackName = data.title;
        $scope.trackCover = data.cover;
        $scope.trackItems = data.items;

        $scope.selectOptions = [
          {index:-1, name: '最初に追加'}
        ];
        for (var i = 0; i < $scope.trackItems.length; i++) {
          var item = $scope.trackItems[i]
          if (item.type === 'place') {
            $scope.selectOptions.push({index:i, name: '「' + item.name + '」の後に追加'});
          }
        };
      });
    };

    $scope.createSpot = function (idx) {
      if (idx === undefined) {
        window.alert('追加する位置を選んでください');
        return;
      }
      $scope.trackItems.splice(idx+1, 0, $scope.data) ;

      var data = {
        title: $scope.trackName,
        cover: $scope.trackCover,
        items: $scope.trackItems
      }
      console.log(data);

      $scope.sending = true;

      MainService.updateTrackData(trackId, data)
      .success(function(resData) {
        $scope.sending = false;
        $location.path('/track/' + trackId);
      }).error(function(e) {
        $scope.sending = false;
        window.alert(e)
      });
    };

  }])
  .controller('TrackEditSpotCtrl', ['$scope', '$rootScope', '$http', '$location', 'id', 'index', 'MainService', function ($scope, $rootScope, $http, $location, trackId, index, MainService) {
    $rootScope.backPath = '/track/' + trackId;
    $scope.sending = false;
    var _placeNum = 0;

    $scope.getTrackData = function () {
      MainService.getTrackData(trackId).then(function(data) {
        $rootScope.pageTitle = data.title;
        $scope.trackName = data.title;
        $scope.trackCover = data.cover;
        $scope.trackItems = data.items;
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
      var data = {
        title: $scope.trackName,
        cover: $scope.trackCover,
        items: $scope.trackItems
      }
      console.log(data);

      $scope.sending = true;

      MainService.updateTrackData(trackId, data)
      .success(function(resData) {
        $scope.sending = false;
        $location.path('/track/' + trackId);
      }).error(function(e) {
        $scope.sending = false;
        window.alert(e)
      });
    };

    $scope.deleteSpot = function () {
      var items = $scope.trackItems;
      items.splice(index, 1);
      console.log(items);

      var data = {
        title: $scope.trackName,
        cover: $scope.trackCover,
        items: items
      }
      $scope.sending = true;

      MainService.updateTrackData(trackId, data)
      .success(function(resData) {
        $scope.sending = false;
        $location.path('/track/' + trackId);
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
