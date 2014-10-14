var PatientInfoPage = function() {
	this.patientName = element(by.model('patient.firstName'));

};

module.exports = new PatientInfoPage();