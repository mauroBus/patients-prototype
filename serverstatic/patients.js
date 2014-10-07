var mongoskin = require('mongoskin');

//mongodb connection
var db = mongoskin.db('mongodb://@localhost:27017/mydb', {safe:true})

var fetchPatientByDNI = function(req, res, next){
    db.collection('patients').findOne({dni:req.patientDNI},{_id:0}, function (err, doc){
        if (err) {
            console.log( err );
            res.send({msg:'db error'});
        } else {
            req.patient = doc;
            next();
        }
    });
};

module.exports = function(app){

    app.get('/api/patients', function(req, res){
        //get all patients
        db.collection('patients').find({},{_id:0}).toArray(function (err, items) {
            if (err) {
                console.log( err );
                res.send({msg:'db error'});
            }
            
            res.json(items);
        });
    });

    app.get('/api/patients/:dni', function (req, res, next) {
        //prepare req for fetch function
        req.patientDNI = req.params.dni;
        next();
    }, fetchPatientByDNI, function (req, res) {
        if (req.patient) {
            res.json(req.patient);
        } else {
            res.status(404).send('DNI not found');
        }
    });

    app.post('/api/patients', function(req, res, next){
        //logging request
		console.log('POST:');
		console.log(req.body);
        next();
    }, function(req, res, next) {
        //checking JSON sanity
        if (req.body && req.body.firstName && req.body.lastName && req.body.dni && req.body.dob) {
            next();
        } else {
            res.send( { msg: 'error: missing fields' });
        }
	}, function(req, res, next) {
        //validating date of birth
        var dateParts = req.body.dob.split('-');
        var date = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
        if (date < new Date()){
            next();
        } else {
            res.send( { msg: 'error: future date of birth!' });
        }
    },function (req, res, next) {
        //prepare req for fetch function
        req.patientDNI = req.body.dni;
        next();
    }, fetchPatientByDNI, function (req, res, next) {
        //check if DNI is already in use
        if (req.patient) {
            res.send( { msg: 'error: dni already in use!' });
        } else {
            next();
        }
    }, function (req, res, next){
        //adding patient to collection
        db.collection('patients').insert(req.body, function(err, result){
                res.send( (err === null) ? { msg: 'success' } : { msg: 'db error!' });
        });
    });

}