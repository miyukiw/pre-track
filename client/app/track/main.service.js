'use strict';

angular.module('preTrackApp')
  .factory('MainService', ['$http', '$q', '$location', function ($http, $q, $location) {

    var _tracks;

    var getTrackData = function (trackId) {
      var deferred = $q.defer();
      if (_tracks) {
        deferred.resolve(_tracks);
      } else {
        $http({
          url: '/api/track/',
          method: 'GET',
          params: {
            id: trackId
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

    var updateTrackData = function (trackId, items) {
      return $http({
        url: '/api/track/' + trackId,
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
