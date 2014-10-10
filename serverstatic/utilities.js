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

    //tries to build a date from a dob value
    //returns null if something goes wrong 
    parseDoB : function (dob) {
        var date = new Date(dob);
        return ( isNaN( date.getTime() ) ) ? null : date;
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