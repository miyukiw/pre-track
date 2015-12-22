'use strict';

angular.module('preTrackApp')
  .factory('MainService', ['$http', '$q', '$location', function ($http, $q, $location) {

    var _tracks = {};

    var getTrackList = function () {
      return $http({
        url: '/api/tracks',
        method: 'GET'
      });
    };

    var createTrack = function (data) {
      return $http({
        url: '/api/create-track',
        method: 'POST',
        data: data
      });
    };

    var getTrackData = function (trackId) {
      var deferred = $q.defer();
      if (_tracks[trackId]) {
        deferred.resolve(_tracks[trackId]);
      } else {
        $http({
          url: '/api/track/' + trackId,
          method: 'GET'
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

    var deleteTrack = function (trackId) {
      return $http({
        url: '/api/track/' + trackId,
        method: 'DELETE'
      });
    }

    return {
      getTrackList: getTrackList,
      createTrack: createTrack,
      getTrackData: getTrackData,
      updateTrackData: updateTrackData,
      deleteTrack: deleteTrack
    };
  }]);
