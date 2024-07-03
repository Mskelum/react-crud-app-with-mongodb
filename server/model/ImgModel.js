const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({

    image:{
        type: String,
        data: Buffer,
        required: true
    }
})  

module.exports = mongoose.model("ImgModel", ImageSchema)