const mongoose = require('../database');


const BusinessSchema =  new mongoose.Schema({
    valorTotal:{
        type: Number
    },
    data: {
        type: Date
    }

});


const Business = mongoose.model('Business', BusinessSchema);

module.exports = Business;