var request = require ('http');

describe("Node server", function() {
	
	it("Server should respond to /", function() {
		request.get('http://test_server',function (response) {
			expect(response.statusCode).toBe(200);
			done();
		});
	});


});	