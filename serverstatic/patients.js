var db = require('./patientsDAO');
var ut = require('./utilities');


//decorates a router/app with patient related sub-routes
module.exports = function(app){
    //get all patients 
    app.get('/patients', function(req, res){
        db.patients.getAll(ut.genericDBCallback(res, function (res, items) {
            res.json(items);
        }));
    });

    //for every request on this route will pre-fetch patient by DNI
    //before calling a specific handler
    app.use('/patients/:dni', function (req, res, next) {
        db.patients.getByDNI(req.params.dni, ut.genericDBCallback(res, function (res, doc) {
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
        db.patients.delete(req.patient.dni, ut.genericDBCallback(res, function () { 
            res.send({ msg: 'success' });
        }));
    });

    //update values 
    app.put('/patients/:dni', function (req, res, next) {
        //check which fields should be updated
        req.changes = ut.extractFields(req.body,['firstName','lastName','dob'],false);
        
        if (!req.changes) {
            return res.status(400).send( { msg: 'error: no fields to update' });
        }
        if (req.changes.dob) {    
            var dob = ut.parseDoB(req.changes.dob);
            if (!dob) {
                return res.status(400).send( { msg: 'error: date format' });
            }   
            if (dob > new Date()) { 
                return res.status(400).send( { msg: 'error: future date of birth!' });
            }
        }
        next();
    }, function (req, res) {
        db.patients.set(req.patient.dni, req.changes, ut.genericDBCallback(res, function (res) { 
            res.send({ msg: 'success' });
        }));
    });

    //adding a new patient to the collection
    app.post('/patients',  function(req, res, next) {

        newPatient = ut.extractFields(req.body,['firstName','lastName','dob','dni'],true);
        //validating patient
        if (newPatient)  {
            var dob = ut.parseDoB(newPatient.dob);
            if (!dob) {
                return res.status(400).send( { msg: 'error: date format' });
            }   
            if (dob > new Date()) { 
                return res.status(400).send( { msg: 'error: future date of birth!' });
            }

            //matches any integer that does not start with zero A.K.A simple dni validation
            if (! /^([1-9]\d*)$/.test(newPatient.dni)) {
                return res.status(400).send( { msg: 'error: invalid DNI' });    
            }
            req.newPatient=newPatient;
            next();
        } else {
            return res.status(400).send( { msg: 'error: missing fields' });
        }
	}, function (req, res, next) {
        db.patients.getByDNI(req.newPatient.dni, ut.genericDBCallback(res, function (res, doc) {
            if (doc) {
                return res.status(409).send( { msg: 'error: dni already in use!' });
            }
            next();
        }));
    }, function (req, res, next){
        db.patients.add(req.newPatient, ut.genericDBCallback(res, function (res) { res.send({ msg: 'success' });} ));
    });

    return app;
};