var express = require('express');
var mongoskin = require('mongoskin');
var bodyParser = require('body-parser');
var app = express();

//serving static files
app.use(express.static('../client/dist'));

//mongodb connection
var db = mongoskin.db('mongodb://@localhost:27017/mydb', {safe:true})

//body parser for post method
app.use(bodyParser.json());


app.get('/api/patients', function(req, res){
    db.collection('patients').find().toArray(function (err, items) {
        res.json(items);
    });
});

app.post('/api/patients', function(req, res){
	console.log('POST:');
	console.log(req.body);
    db.collection('patients').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: 'success' } : { msg: 'error!' }
        );
    });
});


var server = app.listen(process.env.PORT || 8080, function() {
    console.log('Listening on port %d', server.address().port);
});

/* PATIENT JSON eg
{
	firstName:"Pepe",
	lastName:"Potamo",
	dni:"1234567",
	dob:"01-01-1967"
}
*/