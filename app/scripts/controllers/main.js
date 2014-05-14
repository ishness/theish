'use strict';

angular.module('theIshApp')
    .controller('MainCtrl', function($scope, $http, FileUpload) {
        $http.get('/api/awesomeThings').success(function(awesomeThings) {
            $scope.awesomeThings = awesomeThings;
        });
        // Temporary Uoload file stuff
        // I will revisit at a later stage
        $scope.onFileSelect = function($files) {
            FileUpload.onFileSelect($files);
        };

        $scope.image = 'hello';

        $scope.saveImage = function() {
            console.log($scope.image);
            FileUpload.onFileSelect($scope.image);
        };
    });