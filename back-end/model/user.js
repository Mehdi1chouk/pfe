const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({

    nom: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    password1: {
        type: String,
        required: false,
    },
    password2: {
        type: String,
        required: false,
    },

    hash: String,
    salt: String

})

const User = mongoose.model('user', UserSchema);

module.exports = User;