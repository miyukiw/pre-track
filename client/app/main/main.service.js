'use strict';

angular.module('preTrackApp')
  .factory('MainService', ['$http', '$q', '$location', function ($http, $q, $location) {

    var _tracks;

    var getTrackData = function () {
      var deferred = $q.defer();
      if (_tracks) {
        deferred.resolve(_tracks);
      } else {
        $http({
          url: '/api/track/',
          method: 'GET',
          params: {
            id: 1
          }
        }).success(function(data, status, headers, config) {
          _tracks = data.items;
          deferred.resolve(_tracks);
        }).error(function(data, status, headers, config) {
          deferred.reject(data);
        });
      }

      return deferred.promise;
    };

    var updateTrackData = function (items) {
      return $http({
        url: '/api/track',
        method: 'POST',
        data: {
          items: items
        }
      });
    };

    return {
      getTrackData: getTrackData,
      updateTrackData: updateTrackData
    };
  }]);
