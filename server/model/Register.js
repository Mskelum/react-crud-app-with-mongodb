const mongoose = require('mongoose');

const Register = new mongoose.Schema({

    name:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true
    },
    password:{
        type: 'string',
        required: true
    }
})

module.exports = mongoose.model("Register", Register)