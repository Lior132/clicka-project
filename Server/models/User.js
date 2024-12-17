const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    token: {
        type: String,
        require:false
    },
    mail: {
        type: String,
        require: true
    },
    password: {
        type: String,  
        required: true
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
