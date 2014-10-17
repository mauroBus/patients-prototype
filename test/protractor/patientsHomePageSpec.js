describe("patients homepage", function() {

	var patientHomePage = require('./pageObject/patientsHomePage.js');
	var patientInfoPage = require('./pageObject/patientInfoPage.js');
	var dob = new Date(1992, 01, 23);
	var dni;
	beforeEach(function() {
		patientHomePage.get();
		dni = Math.floor((Math.random() * 10000000) + 1);

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
		newPatient(dni,dob);
		expect($('[ng-show=successfulyCreated].alert-success').isDisplayed()).toBeTruthy();

		patientHomePage.getPatient(dni);

		expect(element(by.css('.patient-name')).getText()).toEqual('Lisandro');
		var dniValue = element(by.css('body > div:nth-child(2) > patient-info > div > form > div:nth-child(3) > div > div')).getText();
		expect(dniValue).toEqual(dni.toString());

	});

	it("should edit a patient", function() {
		newPatient(dni,dob);
		expect($('[ng-show=successfulyCreated].alert-success').isDisplayed()).toBeTruthy();

		patientHomePage.getPatient(dni);

		var dniValue = element(by.css('body > div:nth-child(2) > patient-info > div > form > div:nth-child(3) > div > div')).getText();
		expect(element(by.css('.patient-name')).getText()).toEqual('Lisandro');
		expect(dniValue).toEqual(""+dni+"");

		patientHomePage.editPatientInfo();
		patientHomePage.editPatientName('Nombre cambiado');
		patientHomePage.savePatientEdition();

		expect(element(by.css('.patient-name')).getText()).toEqual('Nombre cambiado');
	});

	it("should delete a patient", function() {
		newPatient(dni,dob);
		expect($('[ng-show=successfulyCreated].alert-success').isDisplayed()).toBeTruthy();
		
		patientHomePage.get();
		patientHomePage.searchPatient(dni);

		patientHomePage.getSearchResults().then(function (items) {
			patientHomePage.deletePatient(items[0]);
			patientHomePage.getPatient(dni);

			expect(element(by.model('patient.firstName')).getText()).toEqual('');
		});

	});

	it("shouldn't add a patient with dob of future", function() {
		var today = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // +24 is tomorrow
		patientHomePage.addPatientButton.click();

		expect(element(by.buttonText(today.getDate().toString())).getAttribute('disabled')).toBeTruthy();

	});


	it('should have a title', function() {
		expect(patientHomePage.pageTitle.getText()).toEqual('Patients App Demo');
	});

	function newPatient (dni,dob) {
		patientHomePage.addPatientButton.click();
		patientHomePage.setName('Lisandro');
		patientHomePage.setLastName('Falconi');
		patientHomePage.setDni(dni);
		patientHomePage.setDOB(dob); //00 is january
		patientHomePage.newPatientButton.click();
	}
});

