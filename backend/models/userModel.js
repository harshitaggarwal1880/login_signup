const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type:  String, 
        require: true,
        unique: true,
    },
    password: {
        type:  String, 
        require: true,
    },
    refreshtoken: {
        type: String,
        default: null,
    },      
    isVerified: {
        type: Number,
        default: 0,
    }
})

module.exports = mongoose.model('Users', UserSchema);