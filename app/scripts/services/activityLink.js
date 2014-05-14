'use strict';

angular.module('theIshApp').factory('ActivityLink', function() {
    var link = null;
    return {
        setLink: function(activity) {
            link = activity;
        },
        getLink: function() {
            return link;
        }
    };
});