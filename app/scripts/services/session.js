'use strict';

angular.module('theIshApp')
    .factory('Session', function($resource) {
        return $resource('/api/session/');
    });