'use script';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlaceSchema = new Schema({
    name: String,
    time: {
        0: { // Sunday
            open: Date,
            close: Date
        },
        1: { // Monday
            open: Date,
            close: Date
        },
        2: { // Tuesday
            open: Date,
            close: Date
        },
        3: { // Wednesday
            open: Date,
            close: Date
        },
        4: { // Thursday
            open: Date,
            close: Date
        },
        5: { // Friday
            start: Date,
            end: Date
        },
        6: { // Sun
            start: Date,
            end: Date
        }
    }
});

mongoose.model('Place', PlaceSchema);