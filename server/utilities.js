module.exports = {
    // adds a generic db error check to a callback function.
    genericDBCallback : function (res, callback) {
        return function (err, result) {
            if (err) {
                console.log( err );
                return res.status(500).send({ msg: 'db error!' });
            } 

            if (callback) {
                callback(res, result);
            }
        };
    },


    validateDoB : function(dob) {

        var date = new Date(dob);

        if (isNaN( date.getTime() )) {
            return { msg: 'error: date format' };
        }   
        if (date > new Date()) { 
            return { msg: 'error: future date of birth!' };
        }

        return null;
    },

    validatePatient : function(patient) {
        if (!patient) {
            return { msg: 'error: missing fields' };
        }

        //matches any integer that does not start with zero A.K.A simple dni validation
        if (! /^([1-9]\d*)$/.test(patient.dni)) {
            return { msg: 'error: invalid DNI' };    
        }
        
        return module.exports.validateDoB(patient.dob);
    },


    //extracts required fields from body
    // if strict is set will fail if a field is not found
    // if no fields are found returns a null object
    extractFields : function (body, fields, strict) {
        var parsed = null;
        for ( var index = 0; index < fields.length; ++index) {
            var field = fields[index];
            if (body[field]) {
                parsed = parsed || {};
                parsed[field]=body[field];
            } else if (strict){
                return null;
            }
        }
        return parsed;
    }
};