var mongoskin = require('mongoskin');

//mongodb connection
var db = mongoskin.db('mongodb://@localhost:27017/mydb', {safe:true})

module.exports = {

	listAllPatients: function(req, res){
    	db.collection('patients').find().toArray(function (err, items) {
            if (err) {
                res.send({msg:'db error'});
            }
            
            res.json(items);
    	});
	},

	addPatient:  function(req, res){
		console.log('POST:');
		console.log(req.body);

        if (req.body && req.body.firstName && req.body.lastName && req.body.dni && req.body.dob) {
            var dateParts = req.body.dob.split('-');
            var date = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
            if (date < new Date()){
                db.collection('patients').insert(req.body, function(err, result){
                    res.send( (err === null) ? { msg: 'success' } : { msg: 'db error!' });
                });
            } else {
                res.send( { msg: 'error: future date of birth!' });
            }
        } else {
            res.send( { msg: 'error: missing fields' });
        }

	}

}