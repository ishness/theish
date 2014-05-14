'use strict';

angular.module('theIshApp')
    .controller('ActivityCtrl', function($scope, $routeParams, $location, $anchorScroll, ActivityLink, Activity) {
        // Save this for later 
        // $scope.activity = ActivityLink.getLink();
        $scope.activity = Activity.get({
            id: $routeParams.id
        }, function() {
            $scope.location = $scope.activity.name;
            console.log($scope.activity);
        });
        $scope.style = 'transparent';
        // $scope.place = $scope.activity.name;

        // console.log($routeParams.)
        $scope.text = "Saengcha just became my favourite Thai restaurant. I really enjoy Thai food, so I always drag my friends and family to Thai restaurants for any occasion thinkable. Don't be fooled by the R400 cost, for 6 of us, we all spent just over R250 for 2 starters and 2 mains (mainly curry because it's Yum!) and 2 drinks (beer/wine/tea) per couple (incl. TIps!). Also, not sure why the opening hours on Zomato says 8pm - we were there until 9:30! Now, to the food! I really recommend the Miang-kam for starters - I love self-assembled dishes, and on top of that, it's actually very delicious. We ordered one for the table and everyone got a pleasant surprise. The satay's CANNOT BE MISSED. It's freshly prepared, and a really good price compared to other restaurants, or even some Joburg markets we've been to sell them for R10/stick! The Tom Yum seafood soup is also divine - if you like Miso Soup then this definitely takes it to another level! We ordered three types of curry: Peanut butter, green and yellow. I loved them all, green is smooth and non-spicy, yellow is very flavoursome and peanut butter is very peanut-buttery ;) The waiters although don't have those big charming smiles, are very efficient. We were there on a very quiet Wednesday night before the big Easter weekend, it was just us and another table. But we did see quite a few of customers coming in to get takeaways though. Bottom line: A very authentic family-owned restaurant, I will come back often for takeaways! Pro: Good food, good price, great takeaway place Con: Not the greatest location for people to meet, quite small inside (but the tables are far apart)";
        $scope.textLength = 500;
        $scope.info = "Situated in the heart of it all. Lies the famouse and renown condemned Place of all of eternity";
        $scope.showReview = false;
        $scope.loadingLocations = false;


        $scope.toggleReview = function() {
            // $location.hash('review-form');
            // $anchorScroll();
            $scope.showReview = !$scope.showReview;
            console.log($scope.showReview);

        };
    })
    .controller('CreateCtrl', function($scope, $http) {
        $scope.location = 'Create';
        // $scope.style = 'transparent';
        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8,
            options: {
                disableDefaultUI: !0,
                mapTypeControl: !1,
                tilt: 45
            }
        };
        $scope.senses = {
            see: false,
            hear: false,
            taste: false,
            smell: false,
            touch: false
        };
        $scope.places = [];
        $scope.newPlace = false;


        $scope.getPlaces = function(val) {
            return $http.get('/api/findplacesbyname', {
                params: {
                    name: val
                }
            }).then(function(res) {
                $scope.places = [];
                angular.forEach(res.data, function(item) {
                    $scope.places.push({
                        name: item.name,
                        _id: item._id
                    });
                });
                return $scope.places;
            });
        };

        $scope.onSelect = function($item, $model, $label) {
            // $scope.$item = $item;
            // $scope.$model = $model;
            // $scope.$label = $label;
            // console.log($item);
            // console.log($model);
            // console.log($label);


        };

        $scope.inputLeave = function() {
            // console.log($scope.asyncSelected);
            // if ($scope.asyncSelected._id === !null)
            // 	{
            // 		console.log('existing');
            // 	} else {
            // 		console.log('new');
            // 	};
        };

        $scope.inputChange = function() {
            // console.log('change');
            // console.log($scope.loadingLocations)
        };

        $scope.$watch('loadingLocations', function() {
            // console.log($scope.asyncSelected.length);
            if ($scope.asyncSelected.length > 2) {
                console.log($scope.places.length);
                if ($scope.places.length === 0) {
                    $scope.newPlace = true;
                } else {
                    $scope.newPlace = false;
                }
            } else {
                $scope.newPlace = false;
            };
        });

    })

.controller('ProfileCtrl', function($scope) {
    $scope.location = 'Tiisetso Murray';
    // $scope.style = 'inverse';
});