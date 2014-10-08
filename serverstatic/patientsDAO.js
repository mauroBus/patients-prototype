var mongoskin = require('mongoskin');

//mongodb connection
var db = mongoskin.db('mongodb://@localhost:27017/mydb', {safe:true, auto_reconnect: true});

db.bind('patients').bind({
    getByDNI : function (dni, callback) {
        this.findOne({dni:dni},{_id:0}, callback);
    },
    getAll : function (callback) {
        this.find({},{_id:0}).toArray(callback);
    },
    set : function (dni, changes, callback) {
        this.update({dni: dni}, { $set : changes }, callback);
    },
    delete : function (dni, callback) {
        this.remove({dni: dni}, callback);
    },
    add : function (patient, callback) {
        this.insert( patient, callback);
    }
});

module.exports = db;