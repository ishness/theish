'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    aws = require('./controllers/aws');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {
    // ---------------------------------------
    // V.1
    // ---------------------------------------

    // Places ---------------------------------
    app.get('/api/v1/places/:id');
    app.put('/api/v1/places/:id/edit');
    app.get('/api/v1/places/suggestcompletion');
    // Activities ---------------------------------
    app.get('/api/v1/activities/:id');
    app.put('/api/v1/activities/:id/edit');
    app.post('/api/v1/activities/:id/votes/add');
    app.post('/api/v1/activities/:id/reviews/add');
    app.post('/api/v1/activities/create', api.createActivity);
    // Ishes ---------------------------------
    app.get('/api/v1/ishes/:id');
    app.put('/api/v1/ishes/:id/edit');
    app.post('/api/v1/ishes/:id/votes/add');
    app.post('/api/v1/ishes/:id/reviews/add');
    app.post('/api/v1/ishes/create');
    app.get('/api/v1/ishes/explore');
    app.get('/api/v1/ishes/search');
    app.get('/api/v1/ishes/suggestcompetion');
    // Users ---------------------------------
    app.get('/api/v1/users/profile');
    app.get('/api/v1/users/:id');
    // Other ---------------------------------
    app.get('/api/v1/s3Policy', aws.getS3Policy);
    app.post('/api/v1/session', session.login);
    app.del('/api/v1/session', session.logout);

    // Server API Routes
    app.get('/api/places', api.getPlaces);
    app.post('/api/places', api.createPlace);
    app.get('/api/findactivitiesbyname', api.findActivitiesbyName);
    app.get('/api/findplacesbyname', api.findPlacebyName);
    app.get('/api/activitiesExplore', api.activitiesExplore);
    app.get('/api/activity/:id', api.getActivity);
    app.get('/api/s3Policy', aws.getS3Policy);
    // AutoGenerated
    app.post('/api/users', users.create);
    app.put('/api/users', users.changePassword);
    app.get('/api/users/me', users.me);
    app.get('/api/users/:id', users.show);
    app.post('/api/session', session.login);
    app.del('/api/session', session.logout);
    // Not Used
    app.get('/api/awesomeThings', api.awesomeThings);

    // All undefined api routes should return a 404
    app.get('/api/*', function(req, res) {
        res.send(404);
    });

    // All other routes to use Angular routing in app/scripts/app.js
    app.get('/partials/*', index.partials);
    app.get('/*', middleware.setUserCookie, index.index);
};