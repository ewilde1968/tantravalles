
/*
 * Database Utility Routes
 */
module.exports = Database;

var mongoose = require('mongoose');

var connected = false;
function Database () {
    if( !connected)
        mongoose.connect('mongodb://127.0.0.1/tantravalles');
    connected = true;
    
    return this;
};

Database.prototype.initialize = function() {
    // see if the database is setup properly and, if not, initialize
};
