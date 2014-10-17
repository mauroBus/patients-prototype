var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//serving static files
app.use(express.static('./client/www'));

//body parser for post method
app.use(bodyParser.json());

//set up routes and handlers
app.use('/api', require('./server/patients')(express.Router()));

//start app
var server = app.listen(process.env.PORT || 8080, function() {
    console.log('Listening on port %d', server.address().port);
});
