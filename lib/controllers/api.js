'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    Activity = mongoose.model('Activity'),
    Place = mongoose.model('Place'),
    _s = require('underscore.string');

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
    return Thing.find(function(err, things) {
        if (!err) {
            return res.json(things);
        } else {
            return res.send(err);
        }
    });
};

exports.activitiesExplore = function(req, res) {
    return Activity.find()
        .populate('place', 'name')
        .exec(function(err, activities) {
            if (!err) {
                return res.json(activities);
            } else {
                return res.send(err);
            }
        });
};

exports.getActivity = function(req, res) {
    return Activity.findById(req.params.id)
        .populate('place')
        .exec(function(err, activity) {
            if (!err) {
                return res.json(activity);
            } else {
                return res.send(err);
            }
        });
};

exports.getPlaces = function(req, res) {
    return Place.find(function(err, places) {
        if (!err) {
            return res.json(places);
        } else {
            return res.send(err);
        }
    });
};

// Autocomplete: Find a place by a name
exports.findPlacebyName = function(req, res) {
    // Add a regex to increase searching capabilities
    // Full elastic search would be amazing
    return Place.find({
        name: {
            $regex: req.query.name,
            $options: 'i'
        }
    }, 'name _id', function(err, places) {
        if (!err) {
            return res.json(places);
        } else {
            return res.send(err);
        }
    });
};

// Autocomplete: Find  activities by a name
exports.findActivitiesbyName = function(req, res) {
    // Add a regex to increase searching capabilities
    // Full elastic search would be amazing
    return Activity.find({
        name: {
            $regex: req.query.name,
            $options: 'i'
        }
    }, 'name _id', function(err, activities) {
        if (!err) {
            return res.json(activities);
        } else {
            return res.send(err);
        }
    });
};

exports.createPlace = function(req, res) {
    return Place.create({
        name: req.body.name
    }, function(err, place) {
        if (!err) {
            return res.json(place);
        } else {
            return res.send(err);
        }
    });
};

exports.createActivity = function(req, res) {
    // Convert the name to a title
    req.body.name = _s.titleize(req.body.name);
    // !--- Need to add addition check that the place is indeed new
    if (!req.body.place._id) { // Create a new place if the place does not exist
        req.body.place = _s.titleize(req.body.place);
        Place.create({
            name: req.body.place
        }, function(err, place) {
            if (!err) { // Create the activity and connect to the newly created place
                Activity.create({
                    name: req.body.name,
                    place: place._id // Connect to the newly created place
                }, function(err, activity) {
                    if (!err) {
                        return res.json(200, {
                            status: 200,
                            data: activity
                        });
                    } else {
                        return res.send(err);
                    }
                });
            } else {
                return res.send(err);
            }
        });
    } else { // Create the activity and connect to exisiting place
        Activity.create({
            name: req.body.name,
            place: req.body.place._id // Connect to the existing place
        }, function(err, activity) {
            if (!err) {
                return res.json(200, activity);
            } else {
                res.send(err);
            }
        });
    }
};

exports.editActivity = function(req, res) {
    // console.log('Edit Activity');
    // console.log(req.params.id);
    // console.log(req.body);
    return Activity.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function(err, activity) {
        if (!err) {
            // console.log(activity);
            res.send(true);
        } else {
            res.send(err);
        }
    });
};

exports.reviewActivity = function(req, res) {
    // 1. Get the details of the user that is adding the review
    // 2. Attempt to add the review to the activity
    // 3. If successful increase the rating'
    console.log(res.user);
    Activity.findById(req.params.id, function(err, activity) {
        if (!err) {
            activity.rating.reviews.push({
                vote: req.body.vote,
                tagline: req.body.tagline,
                body: req.body.body
            });
            activity.save(function(err, activity) {
                if (!err) {
                    res.json(activity);
                } else {
                    res.send(err);
                }
            });
        } else {
            return res.send(err);
        }
    });
};