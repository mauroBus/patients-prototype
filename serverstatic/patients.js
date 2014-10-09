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

var parseDoB = function (dob) {
    var dateParts = dob.split('-');
    var date = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
    return ( isNaN( date.getTime() ) ) ? null : date;
};


//decorates a router/app with patient related sub-routes
module.exports = function(app){
    //get all patients 
    app.get('/patients', function(req, res){
        db.patients.getAll(genericDBCallback(res, function (res, items) {
            res.json(items);
        }));
    });

    //for every request on this route will pre-fetch patient by DNI
    //before calling a specific handler
    app.use('/patients/:dni', function (req, res, next) {
        db.patients.getByDNI(req.params.dni, genericDBCallback(res, function (res, doc) {
            if (!doc) {
                return res.status(404).send('DNI not found');
            }
            req.patient = doc;
            next();
        }));
    });

    //return patient data
    app.get('/patients/:dni', function (req, res) {
        res.json(req.patient);
    });

    //delete patient from collection
    app.delete('/patients/:dni', function (req, res) {
        db.patients.delete(req.patient.dni, genericDBCallback(res, function () { 
            res.send({ msg: 'success' });
        }));
    });

    //update values 
    app.put('/patients/:dni', function (req, res, next) {
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
        if (req.changes.dob) {    
            var dob = parseDoB(req.changes.dob);
            if (!dob) {
                return res.status(400).send( { msg: 'error: date format' });
            }   
            if (dob > new Date()) { 
                return res.status(400).send( { msg: 'error: future date of birth!' });
            }
        }
        next();
    }, function (req, res) {
        db.patients.set(req.patient.dni, req.changes, genericDBCallback(res, function (res) { 
            res.send({ msg: 'success' });
        }));
    });

    //adding a new patient to the collection
    app.post('/patients',  function(req, res, next) {
        //validating patient
        if (req.body && req.body.firstName && req.body.lastName && req.body.dni && req.body.dob) {
            var dob = parseDoB(req.body.dob);
            if (!dob) {
                return res.status(400).send( { msg: 'error: date format' });
            }   
            if (dob > new Date()) { 
                return res.status(400).send( { msg: 'error: future date of birth!' });
            }

            //matches any integer that does not start with zero A.K.A simple dni validation
            if (! /^([1-9]\d*)$/.test(req.body.dni)) {
                return res.status(400).send( { msg: 'error: invalid DNI' });    
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

    return app;
};