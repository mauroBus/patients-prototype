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

	var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

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
		//this.newDobInput.sendKeys(dob);
		//getFullYear
		var year = dob.getFullYear();
		element(by.model('newPatient.dob')).element(by.css('[ng-click="toggleMode()"]')).click();
		element(by.css('[ng-click="toggleMode()"]')).click();
		if (year > 2000 && year < 2021) {
			element(by.buttonText(year)).click();
		} else if(year > 1980 && year < 2001){
			element(by.css('[ng-click="move(-1)"]')).click();
			element(by.buttonText(year.toString())).click();
		};
		
		//month
		element(by.buttonText(monthNames[dob.getMonth()])).click();
		//day
		element(by.buttonText(dob.getDate().toString())).click();
		
	};

	this.getSearchResults = function () {
		return element.all(by.repeater('(id, patient) in patients | filter:searchTxt'));
	};

	this.getPatientNameBinding = function (patientDiv) {
		return patientDiv.element(by.binding('patient.firstName')).getText();
	};

	this.getPatientLastNameBinding = function (patientDiv) {
		return patientDiv.element(by.binding('patient.lastName')).getText();
	};

	this.getPatientDNIBinding = function (patientDiv) {
		return patientDiv.element(by.binding('patient.dni')).getText();
	};

	this.getPatientDOBBinding = function (patientDiv) {
		return patientDiv.element(by.binding('patient.dob')).getText();
	};

	this.editPatientInfo = function () {
		element(by.css('[ng-click="edit()"]')).click();
	}

	this.editPatientName = function (newName) {
		element(by.model('patient.firstName')).clear();
		element(by.model('patient.firstName')).sendKeys(newName);
	}

	this.savePatientEdition = function () {
		element(by.css('[ng-click="save()"]')).click();
	}

	this.deletePatient = function (patientDiv) {
		patientDiv.element(by.css('[ng-click="remove($index, $event)"]')).click();
	}

};

module.exports = new PatientsHomePage();