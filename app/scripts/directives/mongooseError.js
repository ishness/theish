'use strict';

angular.module('theIshApp')

/**
 * Removes server error when user updates input
 */
.directive('mongooseError', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            element.on('keydown', function() {
                return ngModel.$setValidity('mongoose', true);
            });
        }
    };
})


.directive('canvasResize', function(FileUpload) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            var context = element[0].getContext('2d');
            var width = 200;
            var imageObj = new Image();
            imageObj.setAttribute('crossOrigin', 'anonymous');
            imageObj.src = 'https://s3.amazonaws.com/theishapp/s3UploadExample/1301%24dukes4.jpg';
            imageObj.onload = function() {
                var aspectRatio = imageObj.height / imageObj.width;
                element[0].width = 200;
                var height = aspectRatio * width;
                element[0].height = height;
                context.drawImage(imageObj, 0, 0, width, height);
                console.log(scope.image);
                scope.image = element[0].toDataURL();
                console.log(scope.image);
                scope.saveImage();

            };

        }
    };
})

.directive('clickLink', ['$location',
    function($location) {
        return {
            link: function(scope, element, attrs) {
                element.on('click', function() {
                    scope.$apply(function() {
                        $location.path(attrs.clickLink);
                    });
                });
            }
        };
    }
])

.directive('uiBlur', function() {
    return function(scope, elem, attrs) {
        elem.bind('blur', function() {
            scope.$apply(attrs.uiBlur);
        });
    };
})

.directive('editTextarea', function() {
    return {
        restrict: 'A',
        replace: false,
        template: '<a>Directive</a>',
        scope: {

        },
        link: function(scope, elem, attrs) {
            console.log('editTextarea Directive');
            console.log(elem);

        },
        controller: function($scope) {

        }
    }
});