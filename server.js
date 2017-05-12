//Libraries to require
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

//Setting default environment variable to development, if it doesn't exist
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Create express 
var app = express();

var config = require('./server/config/config')[env];
require('./server/config/express')(app, config);
require('./server/config/mongoose')(config, env);

var User = mongoose.model('User');
passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({
            userName: username
        }).exec(function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }

));
passport.serializeUser(function (user, done) {
    if (user) {
        done(null, user._id);
    }
});

passport.deserializeUser(function (id, done) {
    User.findOne({
        _id: id
    }).exec(function (err, user) {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }

    });
});

require('./server/config/routes')(app);




//SERVER INITIALIZE
app.listen(config.port);
console.log('listening on port' + config.port + '...');