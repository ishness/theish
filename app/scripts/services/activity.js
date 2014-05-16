'use strict';

angular.module('theIshApp')
    .factory('ActivityExplore', function($resource) {
        return $resource('/api/activitiesExplore');
    })

.factory('Activity', function($resource) {
    return $resource('/api/activity/:id', {
        id: '@id'
    });
})

.factory('Place', function($resource) {
    return $resource('/api/places');
})

.factory('FileUpload', function($http, $upload) {
    var bucket = 'theishapp';
    var imageUploads = [];
    var upload = [];
    var files = null;
    return {
        abort: function(index) {
            upload[index].abort();
            upload[index] = null;
        },
        onFileSelect: function($files) {
            files = $files;
            upload = [];
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                file.progress = parseInt(0);
                (function(file, i) {
                    $http.get('/api/s3Policy?mimeType=' + file.type).success(function(response) {
                        var s3Params = response;
                        upload[i] = $upload.upload({
                            url: 'https://' + bucket + '.s3.amazonaws.com/',
                            method: 'POST',
                            data: {
                                'key': 'images/' + Math.round(Math.random() * 10000) + '$$' + file.name,
                                'acl': 'public-read',
                                'Content-Type': file.type,
                                'AWSAccessKeyId': s3Params.AWSAccessKeyId,
                                'success_action_status': '201',
                                'Policy': s3Params.s3Policy,
                                'Signature': s3Params.s3Signature
                            },
                            file: file
                        }).then(function(response) {
                            file.progress = parseInt(100);
                            if (response.status === 201) {
                                var data = xml2json.parser(response.data),
                                    parsedData;
                                parsedData = {
                                    location: data.postresponse.location,
                                    bucket: data.postresponse.bucket,
                                    key: data.postresponse.key,
                                    etag: data.postresponse.etag
                                };
                                imageUploads.push(parsedData);
                                console.log(parsedData);

                            } else {
                                alert('Upload Failed');
                            }
                        }, null, function(evt) {
                            file.progress = parseInt(100.0 * evt.loaded / evt.total);
                            console.log(file.progress);
                        });
                    });
                }(file, i));
            }
        }
    };
})

.factory('AutoComplete', function($http) {

    // get places function and promise
    var getPlaces = function(val) {
        return $http.get('/api/findplacesbyname', {
            params: {
                name: val
            }
        }).then(function(res) {
            var places = [];
            angular.forEach(res.data, function(item) {
                places.push({
                    name: item.name,
                    _id: item._id
                });
            });
            return places;
        });
    };

    // get activities function and promise
    var getActivities = function(val) {
        console.log('inside activities');
        return $http.get('/api/findactivitiesbyname', {
            params: {
                name: val
            }
        }).then(function(res) {
            console.log(res);
            var activities = [];
            angular.forEach(res.data, function(item) {
                activities.push({
                    name: item.name,
                    _id: item._id
                });
            });
            return activities;
        });
    };

    return {
        getPlaces: getPlaces,
        getActivities: getActivities
    };
})

.factory('ApiV1', function($http) {
    return {
        createActivity: function(newActivity) {
            return $http.post('/api/v1/activities/create', newActivity);
        },
        editActivity: function(activityId, data) {
            return $http.put('/api/v1/activities/' + activityId + '/edit', data);
        },
        reviewActivity: function(activityId, review) {
            return $http.post('/api/v1/activites/' + activityId + '/reviews/add', review);
        }
    }
});