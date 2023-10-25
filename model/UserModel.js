const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname : {
        type : "String"
    },
    lastname : {
        type : "String"
    },
    email : {
        type : "String"
    },
    password : {
        type : "String"
    }
}, {timestamps : true});

const UserModel = mongoose.model('user',UserSchema);

module.exports = UserModel;