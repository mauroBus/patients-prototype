#Server
This node project provides means to manage patient information through a simple REST API.  

##Patient Data Model  

{  
  firstName : Any non-empty string  
  lastName : Any non-empty string  
  dni : Any string that represents a positive integer that doesnt start with zero  
  dob : Any string that represent a past date with format "dd-mm-yyyy"  
}  

## API

* GET /api/patients  
  returns a JSON list of all patients in the system.

* POST /api/patients  
  Expects header: 'Content-Type: application/json'  
  Expects to receive a JSON with containing all the patient information, if it passes the validation will be persisted.  
  Returns 409 if provided DNI is already in use.  
  Returns 404 if some field fail its validation.  

* GET /api/patients/{dni}  
  returns a patient information in JSON format or a 404 if provided dni doesnt match with any patient.  

* DELETE /api/patients/{dni}  
  deletes a patient information or returns 404 if provided dni doesnt match with any patient.  

* PUT /api/patients/{dni}  
  Expects header: 'Content-Type: application/json'  
  Updates a patient information with the data provided in the request body. Valid field to update are firstName, lastName, and dob, any other filed on the request body will be ingnored.  
  New values are subject to the same validation as add new patient, returning 400 if any of them fails.  
  Returns 404 if provided dni doesnt match with any patient.  


##Deployment  


##Known Issues

