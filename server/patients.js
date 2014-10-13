var db = require('./patientsDAO');
var ut = require('./utilities');


//decorates a router/app with patient related sub-routes
module.exports = function(app){
    //get all patients 
    app.get('/patients', function(req, res){
        db.getAll(ut.genericDBCallback(res, function (res, items) {
            res.json(items);
        }));
    });

    //for every request on this route will pre-fetch patient by DNI
    //before calling a specific handler
    app.use('/patients/:dni', function (req, res, next) {
        db.getByDNI(req.params.dni, ut.genericDBCallback(res, function (res, doc) {
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
        db.delete(req.patient.dni, ut.genericDBCallback(res, function () { 
            res.send({ msg: 'success' });
        }));
    });

    //update values 
    app.put('/patients/:dni', function (req, res, next) {
        //check which fields should be updated
        var changes = ut.extractFields(req.body,['firstName','lastName','dob'],false);
        
        console.log(changes);

        if (!changes) {
            return res.status(400).send( { msg: 'error: no fields to update' });
        }

        if (changes.dob){
            var error = ut.validateDoB(changes.dob);
            if (error) return res.status(400).send(error);
        }
        db.set(req.patient.dni, changes, ut.genericDBCallback(res, function (res) { 
            res.send({ msg: 'success' });
        }));
    });

    //adding a new patient to the collection
    app.post('/patients',  function(req, res, next) {

        var newPatient = ut.extractFields(req.body,['firstName','lastName','dob','dni'],true);

        var error = ut.validatePatient(newPatient);
        if (error) return res.status(400).send(error);

        db.getByDNI(newPatient.dni, ut.genericDBCallback(res, function (res, doc) {
            if (doc) {
                return res.status(409).send( { msg: 'error: dni already in use!' });
            }   
            req.newPatient=newPatient;
            next();
        }));
    },function(req,res){
        db.add(req.newPatient, ut.genericDBCallback(res, function (res) { res.send({ msg: 'success' });} ));
    });

    return app;
};