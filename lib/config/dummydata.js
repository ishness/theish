'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Thing = mongoose.model('Thing'),
    Activity = mongoose.model('Activity'),
    Place = mongoose.model('Place');

var townHall = mongoose.Types.ObjectId(),
    dukesBurger = mongoose.Types.ObjectId(),
    northcliffTower = mongoose.Types.ObjectId();


/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
Thing.find({}).remove(function() {
    Thing.create({
        name: 'HTML5 Boilerplate',
        info: 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
        awesomeness: 10
    }, {
        name: 'AngularJS',
        info: 'AngularJS is a toolset for building the framework most suited to your application development.',
        awesomeness: 10
    }, {
        name: 'Karma',
        info: 'Spectacular Test Runner for JavaScript.',
        awesomeness: 10
    }, {
        name: 'Express',
        info: 'Flexible and minimalist web application framework for node.js.',
        awesomeness: 10
    }, {
        name: 'MongoDB + Mongoose',
        info: 'An excellent document database. Combined with Mongoose to simplify adding validation and business logic.',
        awesomeness: 10
    }, function() {
        console.log('finished populating things');
    });
});

// Clear old users, then add a default user
User.find({}).remove(function() {
    User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test'
    }, function() {
        console.log('finished populating users');
    });
});

var populateActivities = function() {
    Activity.find({}).remove(function() {
        Activity.create({
            type: {
                sense: 'See',
                colour: '#2ecc71'
            },
            name: 'Big Bad Wolf',
            place: dukesBurger,
            images: {
                thumbnail: 'https://s3.amazonaws.com/theishapp/images/dukes.jpg',
                cover: "http://img.covry.com/covers/cv/biscuit-and-coffee-cup.jpg"
            },
            location: {
                distance: '3km',
                area: 'Greenside'
            },
            rating: {
                percentage: '86',
                voteCount: 600,
                reviewCount: 300,
                reviews: [{
                    name: 'Tiisetso Murray',
                    user: {
                        name: 'Tiisetso Murray',
                        id: '535fdbc19ada2be509a1e8e7',
                        avatar: {
                            url: 'https://s3.amazonaws.com/theishapp/Original/murray.jpg'
                        }
                    },
                    tagline: 'theBestCurray',
                    review: 'Only the best of the best',
                    likes: 0
                }, {
                    name: 'Tiisetso Murray',
                    user: {
                        name: 'Tiisetso Murray',
                        id: '535fdbc19ada2be509a1e8e7',
                        avatar: {
                            url: 'https://s3.amazonaws.com/theishapp/Original/murray.jpg'
                        }
                    },
                    tagline: 'theBestCurry',
                    review: 'Only the best of the best',
                    likes: 0
                }]
            },
            info: {
                description: "Take on the biggest baddest burger in joburg.\nTake it in if you dare\n\nTake in some more breaks, then decide to edit it. This is a very long paragraph that one should not be taken lightly",
                meta: [{
                    cost: 'R5000'
                }, {
                    takeaway: true
                }]

            }
        }, {
            type: {
                sense: 'See',
                colour: '#e74c3c'
            },
            name: 'ShadowClub',
            place: townHall,
            images: {
                thumbnail: 'https://s3.amazonaws.com/theishapp/images/dukes.jpg',
                cover: "http://img.covry.com/covers/cv/biscuit-and-coffee-cup.jpg"
            },
            location: {
                distance: '5km',
                area: 'Greenside'
            },
            rating: {
                percentage: '94',
                voteCount: 36
            },
            info: {
                description: 'Take on the biggest baddest burger in joburg'
            }
        }, {
            type: {
                sense: 'See',
                colour: '#e74c3c'
            },
            name: 'Sunset',
            place: northcliffTower,
            images: {
                thumbnail: 'https://s3.amazonaws.com/theishapp/images/northcliff.jpg',
                cover: "http://img.covry.com/covers/cv/biscuit-and-coffee-cup.jpg"
            },
            location: {
                distance: '5km',
                area: 'Greenside'
            },
            rating: {
                percentage: '50',
                voteCount: 36
            },
            info: {
                description: 'Take on the biggest baddest burger in joburg'
            }
        }, function() {
            console.log('finished populating activities');
        });
    });
};

Place.find({}).remove(function() {
    Place.create({
        name: 'Town Hall',
        _id: townHall
    }, {
        name: 'Dukes Burger',
        _id: dukesBurger
    }, {
        name: 'Northcliff Tower',
        _id: northcliffTower
    }, function() {
        console.log('Finished populating Places');
        populateActivities();
    });
});