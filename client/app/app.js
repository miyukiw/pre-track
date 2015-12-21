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
        templateUrl: 'app/track/list.html',
        controller: 'TrackListCtrl'
      })
      .when('/create', {
        templateUrl: 'app/track/create-track.html',
        controller: 'TrackCreateCtrl',
        resolve: {
        }
      })
      .when('/track/:id', {
        templateUrl: 'app/track/main.html',
        controller: 'TrackCtrl',
        resolve: {
          id: ['$route', function($route) {
            return $route.current.params.id;
          }],
          step: ['$route', function($route) {
            return $route.current.params.s;
          }]
        }
      })
      .when('/track/:id/add', {
        templateUrl: 'app/track/edit-spot.html',
        controller: 'TrackAddSpotCtrl',
        resolve: {
          id: ['$route', function($route) {
            return $route.current.params.id;
          }]
        }
      })
      .when('/track/:id/edit', {
        templateUrl: 'app/track/edit-track.html',
        controller: 'TrackEditSpotCtrl',
        resolve: {
          id: ['$route', function($route) {
            return $route.current.params.id;
          }],
          index: ['$route', function($route) {
            return 'all';
          }]
        }
      })
      .when('/track/:id/edit/:index', {
        templateUrl: 'app/track/edit-spot.html',
        controller: 'TrackEditSpotCtrl',
        resolve: {
          id: ['$route', function($route) {
            return $route.current.params.id;
          }],
          index: ['$route', function($route) {
            return $route.current.params.index;
          }]
        }
      })
      .when('/dummy/addSpot', {
        templateUrl: 'app/spot/add-spot.html'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
