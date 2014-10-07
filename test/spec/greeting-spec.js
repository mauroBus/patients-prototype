var greeting = require('../greeting');

describe("greeting", function() {
	it("should say 'Good morning' at 4am", function() {
		var fourAm = new Date();
		fourAm.setHours(4);
		expect(greeting(fourAm)).toBe("Good morning");
	});

	it("should say 'Good afternoon' at 12pm", function() {
		var twelvePm = new Date();
		twelvePm.setHours(12);
		expect(greeting(twelvePm)).toBe("Good afternoon");
	});

	it("should say 'Good evening' at 6pm", function() {
		var sixPm = new Date();
		sixPm.setHours(18);
		expect(greeting(sixPm)).toBe("Good evening");
	});

	it("should say 'Good night' at 22pm", function() {
		var tenPm = new Date();
		tenPm.setHours(22);
		expect(greeting(tenPm)).toBe("Good night");
	});
});