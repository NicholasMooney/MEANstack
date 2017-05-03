//Libraries to require
var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');

//Setting default environment variable to development, if it doesn't exist
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Create express 
var app = express();


function compile(str, path) {

    return stylus(str).set('filename', path);
}


//App configurations
// set views folder where I created it
app.set('views', __dirname + '/server/views');
// set view engine to JADE, which will use Jade library to convert Jade files to proper HTML
app.set('view engine', 'jade');
//set Morgan to be used as the logger
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(stylus.middleware({
        src: __dirname + '/public',
        compile: compile

    }

));


app.use(express.static(__dirname + '/public'));


//ROUTES
//when somebody requests /partial/main, /main jade will be constructed.
 app.get('/partials/:partialPath', function (req, res) {

    res.render('partials/' + req.params.partialPath);
});

//catch all route. If landing on an unusual page, go back and render index
app.get('*', function (req, res) {

    res.render('index');
});



//SERVER INITIALIZE
var port = 3030;
app.listen(port);
console.log('listening on port' + port + '...');