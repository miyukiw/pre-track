'use strict';

angular.module('preTrackApp')
  .controller('TrackListCtrl', ['$scope', '$rootScope', '$http', '$location', 'MainService', function($scope, $rootScope, $http, $location, MainService) {
    $rootScope.backPath = null;
    $rootScope.pageTitle = 'Track';
    $rootScope.contextMenu = [
      {title: 'Create Track', path: '/create'}
    ];

    $scope.getTrackList = function () {
      MainService.getTrackList().then(function(res) {
        $scope.list = res.data;
      });
    };

  }])
  .controller('TrackCreateCtrl', ['$scope', '$rootScope', '$http', '$location', 'MainService', function($scope, $rootScope, $http, $location, MainService) {
    $rootScope.backPath = '/';
    $rootScope.pageTitle = 'Create Track';
    $scope.data = {
      items:[
        {"type":"place","name":"スタート場所","comment":""},
        {"type":"place","name":"ゴール場所","comment":""}
      ]
    };
    $scope.create = function () {
      MainService.createTrack($scope.data)
      .success(function(resData) {
        $scope.sending = false;
        $location.path('/track/' + resData.id);
      }).error(function(e) {
        $scope.sending = false;
        window.alert(e)
      });
    };
  }])
  .controller('TrackCtrl', ['$scope', '$rootScope', '$http', '$location', 'id', 'step', 'MainService', function($scope, $rootScope, $http, $location, trackId, step, MainService) {
    $rootScope.backPath = '/';
    $rootScope.pageTitle = '';
    $rootScope.contextMenu = [
      {title: 'Edit Track', path: '/track/' + trackId + '/edit'}
    ];

    $scope.formData = {};
    $scope.spotNum = step || 999;

    var _placeNum = 0;

    $scope.getTrackData = function () {
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

    $scope.addSpot = function() {
      $location.path('/track/' + trackId + '/add');
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
