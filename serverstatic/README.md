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

1. install dependencies  
   ```
   npm install
   ```
2. _Optional_ By default server will look for Mongo on  _'localhost:27017/mydb'_ ,  this can be changed by setting the DB_CONF environment variable.  
   ```
   SET DB_CONF=mongodb://@10.0.0.9:2729/dev
   ```
3. run  
   ```
   npm server.js
   ```
   
##Known Issues  
  
If MongoDB crashes the server is not able to handle the problem correctly, instead of returning a 500 error will hold the request until MongoDB is back again.   

  
##Future work  

  * Include an access logger [https://github.com/expressjs/morgan]  
  
  * Improve error handling [https://github.com/expressjs/errorhandler]  
  
  * Authenticate users [http://passportjs.org/]
