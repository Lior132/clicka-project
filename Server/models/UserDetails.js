const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    fullName: {
        type: String,
        require:false
    },
    age: {
        type: String,
        require: true
    },
    gender: {
        type: String,  
        required: true
    },
    images: [{
        type: String,
        require: false
    }]

});

const UserDetails = mongoose.model('UserDetails', UserDetailsSchema);

module.exports = UserDetails;
