var PatientsHomePage = function() {

	this.searchInput = element(by.model('searchTxt'));

	this.resultName = element(by.binding('patient.firstName'));
	this.resultLastName = element(by.binding('patient.lastName'));
	this.resultDNI = element(by.binding('patient.dni'));
	this.resultDOB = element(by.binding('patient.dob'));

	this.addPatientButton = element(by.buttonText('Add New Patient'));
	this.aboutButton = element(by.buttonText('About'));
			this.homeButton = element(by.buttonText('Home'));

	this.searchButton = element(by.css('body > div:nth-child(2) > section > div > nav > div > form > div > span:nth-child(1) > button'));
	
	this.searchResultsList = element.all(by.repeater('(id, patient) in patients | filter:searchTxt'));

	this.pageTitle = element(by.css('body > div:nth-child(1) > header > div > h1'));

	this.newNameInput = element(by.model('newPatient.firstName'));
	this.newLastNameInput = element(by.model('newPatient.lastName'));
	this.newDNIInput = element(by.model('newPatient.dni'));
	this.newDobInput = element(by.model('newPatient.dob'));
	this.newPatientButton = element(by.buttonText('Add Patient'));

	this.get = function() {
		browser.get('http://localhost:8080');
	};

	this.getPatient = function (dni) {
		browser.get('http://localhost:8080/#/patient/'+dni);
	}

	this.searchPatient = function(name) {
		this.searchInput.sendKeys(name);
		this.searchButton.click();
	};

	this.setName = function (name) {
		this.newNameInput.sendKeys(name);
	};

	this.setLastName = function (lname) {
		this.newLastNameInput.sendKeys(lname);
	};

	this.setDni = function (dni) {
		this.newDNIInput.sendKeys(dni);
	};

	this.setDOB = function (dob) {
		this.newDobInput.sendKeys(dob);
	};

	this.getSearchResults = function () {
		return element.all(by.repeater('(id, patient) in patients | filter:searchTxt'));
	};

	this.getPatientNameBinding = function (element) {
		return element.element(by.binding('patient.firstName')).getText();
	};

	this.getPatientLastNameBinding = function (element) {
		return element.element(by.binding('patient.lastName')).getText();
	};

	this.getPatientDNIBinding = function (element) {
		return element.element(by.binding('patient.dni')).getText();
	};

	this.getPatientDOBBinding = function (element) {
		return element.element(by.binding('patient.dob')).getText();
	};


};

module.exports = new PatientsHomePage();