describe("patients homepage", function() {

	var patientHomePage = require('./pageObject/patientsHomePage.js');
	var patientInfoPage = require('./pageObject/patientInfoPage.js');

	beforeEach(function() {
		patientHomePage.get();
	});

	it("should search the named patient", function() {
		var name = 'Pe';
		patientHomePage.searchPatient(name);

		patientHomePage.getSearchResults().then(function (items) {
			for (var i = 0; i < items.length; i++) {
				var name = patientHomePage.getPatientNameBinding(items[i]);
				var lastName = patientHomePage.getPatientLastNameBinding(items[i]);
				var dni = patientHomePage.getPatientDNIBinding(items[i]);
				var dob = patientHomePage.getPatientDOBBinding(items[i]);
				expect(name || lastName || dni || dob).toContain(name);
			};
		});
	});

	it("should add a new patient", function() {
		var dni = Math.floor((Math.random() * 10000000) + 1);
		patientHomePage.addPatientButton.click();
		patientHomePage.setName('Lisandro');
		patientHomePage.setLastName('Falconi');
		patientHomePage.setDni(dni);
		patientHomePage.setDOB('02-23-1990');
		patientHomePage.newPatientButton.click();
		expect($('[ng-show=successfulyCreated].alert-success').isDisplayed()).toBeTruthy();

		patientHomePage.getPatient(dni);

		expect(element(by.css('.patient-name')).getText()).toEqual('Lisandro');
		var dniValue = element(by.css('body > div:nth-child(2) > patient-info > div > form > div:nth-child(3) > div > div')).getText();
		expect(dniValue).toEqual(""+dni+"");
		expect(element(by.css('body > div:nth-child(2) > patient-info > div > form > div:nth-child(4) > div > div')).getText()).toEqual('02-23-1990');

	});


	it('should have a title', function() {
		expect(patientHomePage.pageTitle.getText()).toEqual('Patients App Demo');
	});
});

