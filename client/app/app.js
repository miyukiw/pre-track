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
        templateUrl: 'app/spot/add-spot.html',
        controller: 'EditSpotCtrl'
      })
      .when('/edit', {
        templateUrl: 'app/admin/edit-json.html',
        controller: 'AdminCtrl',
        resolve: {
          index: ['$route', function($route) {
            return 'all';
          }]
        }
      })
      .when('/edit/:index', {
        templateUrl: 'app/admin/edit-spot.html',
        controller: 'AdminCtrl',
        resolve: {
          index: ['$route', function($route) {
            return $route.current.params.index;
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
