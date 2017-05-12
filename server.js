//Libraries to require
var express = require('express');

//Setting default environment variable to development, if it doesn't exist
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Create express 
var app = express();

var config = require('./server/config/config')[env];
require('./server/config/express')(app, config);
require('./server/config/mongoose')(config, env);

require('./server/config/passport')();

require('./server/config/routes')(app);




//SERVER INITIALIZE
app.listen(config.port);
console.log('listening on port' + config.port + '...');