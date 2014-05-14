'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    user: {
        name: String,
        id: Schema.Types.ObjectId, // This ensures that it is a valid objectId and not just some string
        avatar: {
            url: String
        }
    },
    tagline: String,
    review: String,
    likes: Number,
    created: {
        type: Date,
        default: Date.now
    }
});