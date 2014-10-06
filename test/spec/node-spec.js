var request = require("request");
var mongoskin = require('mongoskin');


describe("Node server", function() {
	var db = mongoskin.db('mongodb://@localhost:27017/mydb', {safe:true})

	it("should respond cannot get /", function(done) {
		request('http://localhost:8080',function (error, response, body) {
			expect(response.statusCode).toEqual(404);
			done();
		});
	});

	beforeEach(function() {
		db.collection('patients').remove({}, function (err,result) {
			if (!err) console.log('Patients deleted!');
		});

	});

	it("should respond empty body", function(done) {
	
		db.collection('patients').count(function (err,count) {
			expect(count).toEqual(0);
			done();
		});	

		request('http://localhost:8080/api/patients',function (error, response, body) {
			expect(response.statusCode).toEqual(200);
			expect(body).toEqual('[]');
			done();
		});
	});

	it('should insert a patient and respond success', function(done) {


		var url = 'http://localhost:8080/api/patients';
        var params = null;
		params = {
                url: url,
    			json: true,
    			body: {
    				firstName: 'Pepe',
					lastName: 'Argento',
					dni:'1234567',
					dob:'01-01-1967'
    			}
            };

      	request.post(params,
	    	function (error, response, body) {
    		expect(response.statusCode).toEqual(200);
	        expect(body.msg).toEqual('success');
	        done();
    	}
	);	
    });

});	