'use strict';

angular.module('theIshApp').controller('HomeCtrl', function($scope, $location, ActivityExplore, ActivityLink) {
    $scope.location = 'Explore';
    $scope.style = 'inverse';

    $scope.exploreList = ActivityExplore.query();

    $scope.createLink = function(activity) {
        ActivityLink.setLink(activity);
    };

    $scope.go = function(path) {
        $location.path(path);
    };
});