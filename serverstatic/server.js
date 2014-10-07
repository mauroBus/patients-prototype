var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var patients = require('./patients');

//serving static files
app.use(express.static('../client/www'));

//body parser for post method
app.use(bodyParser.json());

app.get('/api/patients', patients.listAllPatients);
app.post('/api/patients', patients.addPatient);


var server = app.listen(process.env.PORT || 8080, function() {
    console.log('Listening on port %d', server.address().port);
});
