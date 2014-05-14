'use strict';

angular.module('theIshApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap.tpls',
    'ui.bootstrap.modal',
    'ui.bootstrap.buttons',
    'ui.bootstrap.typeahead',
    'mgcrea.ngStrap.datepicker',
    'mgcrea.ngStrap.timepicker',
    'mgcrea.ngStrap.select',
    'mgcrea.ngStrap.typeahead',
    'mgcrea.ngStrap.tooltip',
    'mgcrea.ngStrap.helpers.parseOptions',
    'angularFileUpload',
    'google-maps',
    'xeditable'

])
    .config(function($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home',
                controller: 'HomeCtrl'
            })
            .when('/login', {
                templateUrl: 'partials/login',
                controller: 'LoginCtrl'
            })
            .when('/signup', {
                templateUrl: 'partials/signup',
                controller: 'SignupCtrl'
            })
            .when('/settings', {
                templateUrl: 'partials/settings',
                controller: 'SettingsCtrl',
                authenticate: true
            })
            .when('/home', {
                templateUrl: 'partials/home',
                controller: 'HomeCtrl'
            })
            .when('/activity/:id', {
                templateUrl: 'partials/activity',
                controller: 'ActivityCtrl'
            })
            .when('/create', {
                templateUrl: 'partials/createActivity',
                controller: 'CreateCtrl'
            })
            .when('/profile', {
                templateUrl: 'partials/profile',
                controller: 'ProfileCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);

        // Intercept 401s and redirect you to login
        $httpProvider.interceptors.push(['$q', '$location',
            function($q, $location) {
                return {
                    'responseError': function(response) {
                        if (response.status === 401) {
                            $location.path('/login');
                            return $q.reject(response);
                        } else {
                            return $q.reject(response);
                        }
                    }
                };
            }
        ]);
    })
    .run(function($rootScope, $location, Auth) {

        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$routeChangeStart', function(event, next) {

            if (next.authenticate && !Auth.isLoggedIn()) {
                $location.path('/login');
            }
        });
    });