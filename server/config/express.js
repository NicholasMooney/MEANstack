var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    stylus = require('stylus'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function (app, config) {
    function compile(str, path) {

        return stylus(str).set('filename', path);
    }



    //App configurations
    // set views folder where I created it
    app.set('views', config.rootPath + '/server/views');
    // set view engine to JADE, which will use Jade library to convert Jade files to proper HTML
    app.set('view engine', 'jade');
    //set Morgan to be used as the logger
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    
    app.use(cookieParser());
    app.use(session({secret:'nicholas anthony mooney', resave:false, saveUninitialized:false}));
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use(stylus.middleware({
            src: config.rootPath + '/public',
            compile: compile

        }

    ));


    app.use(express.static(config.rootPath + '/public'));
};