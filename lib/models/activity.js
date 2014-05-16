'use strict';

var mongoose = require('mongoose'),
    // Place = mongoose.model('Place'),
    Schema = mongoose.Schema;


var ActivityReviewSchema = new Schema({
    user: {
        name: String,
        id: Schema.Types.ObjectId, // This ensures that it is a valid objectId and not just some string
        avatar: {
            url: String
        }
    },
    vote: Boolean,
    tagline: String,
    body: String,
    likes: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now
    }
});

var ActivitySchema = new Schema({
    name: String,
    place: {
        type: Schema.Types.ObjectId,
        ref: 'Place'
    },
    type: {
        sense: String,
        colour: String
    },
    images: {
        thumbnail: String,
        cover: String
    },
    rating: {
        percentage: Number,
        voteCount: Number,
        reviewCount: Number,
        reviews: [ActivityReviewSchema]
    },
    location: {
        distance: String,
        area: String
    },
    info: {
        description: String,
        time: String,
        meta: [], // Allow arbitary Meta data
        tags: [String]
    },
    time: {
        0: { // Sunday
            open: Date,
            close: Date,
            placeDependant: {
                type: Boolean,
                default: true
            }
        },
        1: { // Monday
            open: Date,
            close: Date,
            placeDependant: {
                type: Boolean,
                default: true
            }
        },
        2: { // Tuesday
            open: Date,
            close: Date,
            placeDependant: {
                type: Boolean,
                default: true
            }
        },
        3: { // Wednesday
            open: Date,
            close: Date,
            placeDependant: {
                type: Boolean,
                default: true
            }
        },
        4: { // Thursday
            open: Date,
            close: Date,
            placeDependant: {
                type: Boolean,
                default: true
            }
        },
        5: { // Friday
            start: Date,
            end: Date,
            placeDependant: {
                type: Boolean,
                default: true
            }
        },
        6: { // Sun
            start: Date,
            end: Date,
            placeDependant: {
                type: Boolean,
                default: true
            }
        }
    }
});


mongoose.model('Activity', ActivitySchema);