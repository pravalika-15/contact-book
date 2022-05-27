const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    number: {
        type:String,
        required:true
    },
    relation: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
})

const Userdb = mongoose.model('userdb', Schema);

module.exports = Userdb