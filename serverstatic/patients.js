var mongoskin = require('mongoskin');

//mongodb connection
var db = mongoskin.db('mongodb://@localhost:27017/mydb', {safe:true})

var fetchPatientByDNI = function(req, res, next){
    db.collection('patients').findOne({dni:req.patientDNI},{_id:0}, function (err, doc){
        if (err) {
            console.log( err );
            res.status(500).send({msg:'db error'});
        } else {
            req.patient = doc;
            next();
        }
    });
};


module.exports = function(app){

    //get all patients 
    app.get('/api/patients', function(req, res){
        db.collection('patients').find({},{_id:0}).toArray(function (err, items) {
            if (err) {
                console.log( err );
                res.status(500).send({msg:'db error'});
            }
            
            res.json(items);
        });
    });

    //for every request on this route will pre-fetch patient by DNI
    //before calling a specific handler
    app.use('/api/patients/:dni', function (req, res, next) {
        //prepare req for fetch function
        req.patientDNI = req.params.dni;
        next();
    }, fetchPatientByDNI, function (req, res, next) {
        if (req.patient) {
            next();
        } else {
            res.status(404).send('DNI not found');
        }
    });

    //returns patient data
    app.get('/api/patients/:dni', function (req, res) {
        res.json(req.patient);
    });

    //deletes patient from collection
    app.delete('/api/patients/:dni', function (req, res) {
        db.collection('patients').remove({dni:req.patient.dni}, function (err, result) {
            if (err) {
                res.status(500).send({ msg: 'db error!' });
            } else {
                res.send({ msg: 'success' });
            }
        });
    });

    //adding a new patient to the collection
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
            res.status(400).send( { msg: 'error: missing fields' });
        }
	}, function(req, res, next) {
        //validating date of birth
        var dateParts = req.body.dob.split('-');
        var date = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
        if (date < new Date()){
            next();
        } else {
            res.status(400).send( { msg: 'error: future date of birth!' });
        }
    }, function (req, res, next) {
        //prepare req for fetch function
        req.patientDNI = req.body.dni;
        next();
    }, fetchPatientByDNI, function (req, res, next) {
        //check if DNI is already in use
        if (req.patient) {
            res.status(409).send( { msg: 'error: dni already in use!' });
        } else {
            next();
        }
    }, function (req, res, next){
        //adding patient to collection
        db.collection('patients').insert(req.body, function(err, result){
           if (err) {
                res.status(500).send({ msg: 'db error!' });
            } else {
                res.send({ msg: 'success' });
            }
        });
    });

}