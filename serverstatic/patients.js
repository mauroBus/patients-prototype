var db = require('./patientsDAO');

var genericDBCallback = function (res, callback) {
    return function (err, result) {
        if (err) {
            console.log( err );
            return res.status(500).send({ msg: 'db error!' });
        } 

        if (callback) {
            callback(res, result);
        }
    };
};

var dobFromFuture = function(dob) {
    var dateParts = dob.split('-');
    var date = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
    return ( date > new Date() ) ? true : false;
};

module.exports = function(app){
    //get all patients 
    app.get('/api/patients', function(req, res){
        db.patients.getAll(genericDBCallback(res, function (res, items) {
            res.json(items);
        }));
    });

    //for every request on this route will pre-fetch patient by DNI
    //before calling a specific handler
    app.use('/api/patients/:dni', function (req, res, next) {
        db.patients.getByDNI(req.params.dni, genericDBCallback(res, function (res, doc) {
            if (!doc) {
                return res.status(404).send('DNI not found');
            }
            req.patient = doc;
            next();
        }));
    });

    //return patient data
    app.get('/api/patients/:dni', function (req, res) {
        res.json(req.patient);
    });

    //delete patient from collection
    app.delete('/api/patients/:dni', function (req, res) {
        db.patients.delete(req.patient.dni, genericDBCallback(res, function () { 
            res.send({ msg: 'success' });
        }));
    });

    //update values 
    app.put('/api/patients/:dni', function (req, res, next) {
        //check which fields should be updated
        var fields = ['firstName','lastName','dob'];
        for ( var index = 0; index < fields.length; ++index) {
            var field = fields[index];
            if (req.body[field]) {
                var changes = req.changes || {};
                changes[field]=req.body[field];
                req.changes = changes;
            }
        }
        if (!req.changes) {
            return res.status(400).send( { msg: 'error: no fields to update' });
        }

        if (req.changes.dob && dobFromFuture(req.changes.dob)) {         
            return res.status(400).send( { msg: 'error: future date of birth!' });
        }
        next();
    }, function (req, res) {
        db.patients.set(req.patient.dni, req.changes, genericDBCallback(res, function (res) { 
            res.send({ msg: 'success' });
        }));
    });

    //adding a new patient to the collection
    app.post('/api/patients',  function(req, res, next) {
        //validating patient
        if (req.body && req.body.firstName && req.body.lastName && req.body.dni && req.body.dob) {
            if (dobFromFuture(req.body.dob)) {
                return res.status(400).send( { msg: 'error: future date of birth!' });
            }
            next();
        } else {
            return res.status(400).send( { msg: 'error: missing fields' });
        }
	}, function (req, res, next) {
        db.patients.getByDNI(req.body.dni, genericDBCallback(res, function (res, doc) {
            if (doc) {
                return res.status(409).send( { msg: 'error: dni already in use!' });
            }
            next();
        }));
    }, function (req, res, next){
        db.patients.add(req.body, genericDBCallback(res, function (res) { res.send({ msg: 'success' });} ));
    });
};