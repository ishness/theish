'use strict';

angular.module('theIshApp')
    .controller('NavbarCtrl', function($scope, $location, $modal, Auth) {
        $scope.menu = [{
            'title': 'Explore',
            'link': '/home'
        }, {
            'title': 'Create',
            'link': '/create'
        }, {
            'title': 'Profile',
            'link': '/profile'
        }];

        $scope.logout = function() {
            Auth.logout()
                .then(function() {
                    $location.path('/login');
                });
        };

        $scope.isActive = function(route) {
            return route === $location.path();
        };

        $scope.items = ['item1', 'item2', 'item3'];

        $scope.openCreateModal = function(size) {

            var modalInstance = $modal.open({
                templateUrl: '/partials/modalCreate.html',
                controller: 'ModalCreateCtrl',
                backdrop: 'static',
                size: 'sm'
            });

            return false;
        };
    });


var ModalCreateCtrl = function($scope, $modalInstance, $http, $location, AutoComplete, Place, ApiV1) {

    // Initialiaze the Dropdown Menus
    $scope.activityTimeDropdown = [{
        time: 'Place Operating hours'
    }, {
        time: 'Mornings',
        default: {
            startTime: '06:00',
            endTime: '12:00'
        }
    }, {
        time: 'Afternoons',
        default: {
            startTime: '12:00',
            endTime: '18:00'
        }
    }, {
        time: 'Evenings',
        default: {
            startTime: '18:00',
            endTime: '00:00'
        }
    }, {
        time: 'Day Specific'
    }, {
        time: 'Anytime'
    }];


    // Day Specific Dropdown
    $scope.daySpecificDropdown = [{
        time: 'Place Operating hours'
    }, {
        time: 'Mornings',
        default: {
            startTime: '06:00',
            endTime: '12:00'
        }
    }, {
        time: 'Afternoons',
        default: {
            startTime: '12:00',
            endTime: '18:00'
        }
    }, {
        time: 'Evenings',
        default: {
            startTime: '18:00',
            endTime: '00:00'
        }
    }, {
        time: 'Set Time',
        default: {
            startTime: '06:00',
            endTime: '18:00'
        }
    }];

    $scope.daySpecific = [{
        day: 'Mon',
        selected: false,
        showDefaultTime: false,
        value: $scope.daySpecificDropdown[0]
    }, {
        day: 'Tue',
        selected: false,
        showDefaultTime: false,
        value: $scope.daySpecificDropdown[0]
    }, {
        day: 'Wed',
        selected: false,
        showDefaultTime: false,
        value: $scope.daySpecificDropdown[0]
    }, {
        day: 'Thu',
        selected: false,
        showDefaultTime: false,
        value: $scope.daySpecificDropdown[0]
    }, {
        day: 'Fri',
        selected: false,
        showDefaultTime: false,
        value: $scope.daySpecificDropdown[0]
    }, {
        day: 'Sat',
        selected: false,
        showDefaultTime: false,
        value: $scope.daySpecificDropdown[0]
    }, {
        day: 'Sun',
        selected: false,
        showDefaultTime: false,
        value: $scope.daySpecificDropdown[0]
    }];

    $scope.senses = {
        see: false,
        smell: false,
        taste: false,
        hear: false,
        touch: false
    };

    //----------------------------------------------
    //  Initialize form variables
    //----------------------------------------------
    $scope.newActivity = {};
    $scope.newActivity.name = 'Test';
    $scope.newActivity.place = '';
    // Select the first activity time dropdown as the default
    $scope.newActivity.time = $scope.activityTimeDropdown[0];
    // Auto select Activity to be created
    $scope.type = 'Activity';
    // Hide the default time and the day specific form
    $scope.showDefaultTime = false;
    $scope.showDaySpecific = false;
    // Auto select Today for the Day Specific
    $scope.daySpecific[moment().day()].selected = true;
    // Auto set start and end dates as today
    $scope.eventStartDate = Date();
    $scope.eventEndDate = $scope.eventStartDate;
    // Get the function to call get places autocomplete
    $scope.getPlaces = AutoComplete.getPlaces;
    $scope.getActivities = AutoComplete.getActivities;
    // New Place is true by default
    $scope.newPlace = true;

    //----------------------------------------------
    //  Functions
    //---------------------------------------------- -

    // When the activity dropdown item is selected
    $scope.activityTimeDropdownSelected = function(selectedTime) {
        switch (selectedTime.time) {
            case 'Mornings':
            case 'Afternoons':
            case 'Evenings':
                $scope.showDaySpecific = false;
                $scope.showDefaultTime = true;
                $scope.activityStartTime = moment(selectedTime.
                    default.startTime, 'HH:mm').format();
                $scope.activityEndTime = moment(selectedTime.
                    default.endTime, 'HH:mm').format();
                break;
            case 'Day Specific':
                $scope.showDefaultTime = false;
                $scope.showDaySpecific = true;
                break;
            default:
                $scope.showDefaultTime = false;
                $scope.showDaySpecific = false;
        }
    };
    // When the day specific dropdown item is selected
    $scope.daySpecificDropdownSelected = function(dayItem) {
        if (dayItem.value.time === 'Mornings' || dayItem.value.time === 'Afternoons' || dayItem.value.time === 'Evenings' | dayItem.value.time === 'Set Time') {
            dayItem.showDefaultTime = true;
            dayItem.value.startTime = moment(dayItem.value.
                default.startTime, 'HH:mm').format();
            dayItem.value.endTime = moment(dayItem.value.
                default.endTime, 'HH:mm').format();
        } else {
            dayItem.showDefaultTime = false;
        }
        return dayItem
    };

    // Select the sense that has been clicked
    // Toggle other sense to be inactive
    $scope.senseClick = function(sense) {
        $scope.senses = {
            see: false,
            smell: false,
            taste: false,
            hear: false,
            touch: false
        }
        $scope.senses[sense] = true;
        $scope.sense = sense;
    };

    $scope.placeOnSelect = function($item) {
        // Only When it is indeed selected from the drop down, then it is connected to the old place
        $scope.place = $item;
        $scope.newPlace = false;
    };

    //----------------------------------------------
    //  Modal Functions
    //----------------------------------------------

    $scope.new = {
        name: '',
        place: {
            name: '',
            _id: ''
        },
        type: {
            sense: ''
        },
        time: [{ // Sunday
            startTime: '',
            endTime: ''
        }, { // Monday
            startTime: '',
            endTime: ''
        }, { // Tuesday
            startTime: '',
            endTime: ''
        }, { // Wednesday
            startTime: '',
            endTime: ''
        }, { // Thursday
            startTime: '',
            endTime: ''
        }, { // Friday
            startTime: '',
            endTime: ''
        }, { // Saturday
            startTime: '',
            endTime: ''
        }]
    }

    $scope.ok = function() {
        //$modalInstance.close();
        // 1. Create Place if new
        // Set the Standard 9-5 Time
        // 2. Calculate the time array
        if ($scope.newPlace) {
            // Create a new place

            // $scope.newP = Place.save({
            //     name: 'test'
            // }, function(place) {
            //     console.log(newP);
            // });
            $http.post('/api/places', {
                name: 'test2'
            }).success(function(data) {
                console.log(data);
            });
        }

        if ($scope.type === 'Activity') {
            // Create Activity

        } else if ($scope.type === 'Event') {
            // Create Event
        }

    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

    $scope.createActivity = function() {
        $scope.newActivity.sense = $scope.sense;
        ApiV1.createActivity($scope.newActivity)
            .success(function(res) {
                // Close the modal
                $modalInstance.close();
                // Redirect to the newly created activity
                $location.path('/activity/' + res.data._id);
            });


    };

};