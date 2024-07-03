const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true
    },
    age:{
        type: 'number',
        required: true
    },
    address:{
        type: 'string',
        required: true
    }
})

module.exports = mongoose.model("Model", UserSchema)