'use strict';

angular.module('preTrackApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          step: ['$route', function($route) {
            return $route.current.params.s;
          }]
        }
      })
      .when('/addSpot', {
        templateUrl: 'app/spot/edit-spot.html',
        controller: 'EditSpotCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
