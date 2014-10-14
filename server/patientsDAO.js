//var mongoskin = require('mongoskin');
var mongoose = require('mongoose');

var dbConf = process.env.DB_CONF || 'mongodb://@localhost:27017/mydb'; 
var db = mongoose.connect(dbConf, {safe:true, auto_reconnect: true});

var Patient  = mongoose.model('Patient',
    new mongoose.Schema({
        firstName: String,
        lastName: String,
        dob: String, //Date
        dni: String 
    },{collection: 'patients'})
);



module.exports ={
    getByDNI : function (dni, callback) {
        Patient.findOne({dni:dni},{'__v':0,'_id': 0}, callback);
    },
    getAll : function (callback) {
        Patient.find({},{'__v':0,'_id': 0}).exec(callback);
    },
    set : function (dni, changes, callback) {
        Patient.findOneAndUpdate({dni: dni}, changes, callback);
    },
    delete : function (dni, callback) {
        Patient.remove({dni: dni}, callback);
    },
    add : function (patient, callback) {
        ( new Patient(patient)).save(callback);
    }
};
