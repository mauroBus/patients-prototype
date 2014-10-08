var request = require("request");
var mongoskin = require('mongoskin');

describe("Patients REST API", function() {
	
	var url = 'http://localhost:8080/api/patients';
	var db = mongoskin.db('mongodb://@localhost:27017/mydb', {safe:true});
    var params = null;


	it("should respond cannot get /", function(done) {
		request('http://localhost:8080',function (error, response, body) {
			expect(response.statusCode).toEqual(404);
			done();
		});
	});

	it("should respond empty body", function(done) {

		db.collection('patients').remove({}, function (err,result) {
			if (!err) console.log('Patients emptied!');
			request('http://localhost:8080/api/patients',function (error, response, body) {
				expect(response.statusCode).toEqual(200);
				expect(body).toEqual('[]');
				done();
			});
			done();
		});

		db.collection('patients').count(function (err,count) {
			expect(count).toEqual(0);
			done();
		});	

		
	});


    it("should fail when I want to insert a patient w empty fields", function(done) {
        params = buildParams(url,'','Argento','12345678','01-01-1967');

        request.post(params,
    	function (error, response, body) {
			expect(response.statusCode).toEqual(400);
        	expect(body.msg).toEqual('error: missing fields');
        	done();
		}
    	);


        params = buildParams(url,'Pepe','','12345678','01-01-1967');
		request.post(params,
	    	function (error, response, body) {
				expect(response.statusCode).toEqual(400);
	        	expect(body.msg).toEqual('error: missing fields');
	        	done();
			}
    	);

    	params = buildParams(url,'Pepe','Argento','','01-01-1967');
		request.post(params,
	    	function (error, response, body) {
				expect(response.statusCode).toEqual(400);
	        	expect(body.msg).toEqual('error: missing fields');
	        	done();
			}
    	);

    	params = buildParams(url,'Pepe','Argento','12536','');
		request.post(params,
	    	function (error, response, body) {
				expect(response.statusCode).toEqual(400);
	        	expect(body.msg).toEqual('error: missing fields');
	        	done();
			}
    	);


    });


	it("should fail when I want to insert a patient wout dni ", function(done) {
        params = buildParams(url,'Pepe','Argento','','01-01-1967');

      	request.post(params,
	    	function (error, response, body) {
    		expect(response.statusCode).toEqual(400);
	        expect(body.msg).toEqual('error: missing fields');
	        done();
    	}
	);
    });


	it('should insert a patient and respond success', function(done) {
        params = buildParams(url,'Pepe','Argento','123456789','01-01-1967');

      	request.post(params,
	    	function (error, response, body) {
    		expect(response.statusCode).toEqual(200);
	        expect(body.msg).toEqual('success');
	        done();
    	}
	);	
    });

    it('should fail when I want to insert a patient with dni existing', function(done) {
        params = buildParams(url,'Pepe','Argento','12345','01-01-1967');

      	request.post(params,
	    	function (error, response, body) {
    		expect(response.statusCode).toEqual(200);
	        expect(body.msg).toEqual('success');

	        params = buildParams(url,'Pepe','Argento','12345','01-01-1967');

		      	request.post(params,
			    	function (error, response, body) {
		    		expect(response.statusCode).toEqual(409);
			        expect(body.msg).toEqual('error: dni already in use!');
			        done();
		    	}
			);	
	        done();
    	});

        
    });

    it("should fail when I want to insert a date of birth in future", function(done) {
		var today = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // +24 is tomorrow
	    var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!
	    var yy = today.getFullYear();
	    var dobFuture = dd+'-'+mm+'-'+yy;
    	params = buildParams(url,'Pepe','Argento','901312', dobFuture);

      	request.post(params,
	    	function (error, response, body) {
    		expect(response.statusCode).toEqual(400);
	        expect(body.msg).toEqual('error: future date of birth!');
	        done();
    	});   	
    });


    it("should fail when I want to inser a wrong date format", function(done) {

    	params = buildParams(url,'Pepe','Argento','901312', '17823891');

      	request.post(params,
	    	function (error, response, body) {
    		expect(response.statusCode).toEqual(400);
	        expect(body.msg).toEqual('error: future date of birth!');
	        done();
    	});   
    });


    it("should return null when I search by not found dni", function() {

      	request(url+'/000000',
	    	function (error, response, body) {
    		expect(response.statusCode).toEqual(404);
	        expect(body.msg).toEqual('DNI not found');
	        done();
    	});   
    });

	function buildParams (url,name,lname,dni,dob) {
		var params = null;
		params = {
                url: url,
    			json: true,
    			body: {
    				firstName: name,
					lastName: lname,
					dni:dni,
					dob:dob
    			}
            };

        return params;
	}



});	