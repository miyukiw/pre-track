'use strict';

angular.module('preTrackApp')
  .factory('MainService', ['$http', '$q', '$location', function ($http, $q, $location) {

    var _tracks = {};

    var getTrackData = function (trackId) {
      var deferred = $q.defer();
      if (_tracks[trackId]) {
        deferred.resolve(_tracks[trackId]);
      } else {
        $http({
          url: '/api/track/',
          method: 'GET',
          params: {
            id: trackId
          }
        }).success(function(data, status, headers, config) {
          _tracks[trackId] = data;
          deferred.resolve(_tracks[trackId]);
        }).error(function(data, status, headers, config) {
          deferred.reject(data);
        });
      }

      return deferred.promise;
    };

    var updateTrackData = function (trackId, newData) {
      return $http({
        url: '/api/track/' + trackId,
        method: 'POST',
        data: newData
      }).success(function(data, status, headers, config) {
        _tracks[trackId] = newData;
      });
    };

    return {
      getTrackData: getTrackData,
      updateTrackData: updateTrackData
    };
  }]);
