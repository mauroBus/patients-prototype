var mongoskin = require('mongoskin');

//mongodb connection
var db = mongoskin.db('mongodb://@localhost:27017/mydb', {safe:true})

module.exports = {

	listAllPatients: function(req, res){
    	db.collection('patients').find().toArray(function (err, items) {
        	res.json(items);
    	});
	},

	addPatient:  function(req, res){
		console.log('POST:');
		console.log(req.body);
    	db.collection('patients').insert(req.body, function(err, result){
        	res.send(
            	(err === null) ? { msg: 'success' } : { msg: 'error!' }
        	);
    	});
	}

}