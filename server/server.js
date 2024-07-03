const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const router = require('./routes/Route')
const cors = require('cors');

const app = express(); 
const PORT = 8000;

app.use(express.json())
app.use(cors());  
app.use(bodyParser.json());
app.use("/users",router)
app.use("/files", express.static('files'))

const DB_URL = "mongodb+srv://first:19990617@cluster0.agok927.mongodb.net/crud?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Failed to connect to MongoDB", err);
    });



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`); 
});


require("./model/Register");
const User = mongoose.model("Register");
app.post('/register', async (req, res) => {
    const {name,email,password} = req.body;
    try{
        await User.create({name,email,password});
        res.send({ status: 'success' });
    }
    catch(err) {
        res.send({ status: 'error' });
    }
})

app.post('/login', async (req, res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.json({ status: 'error' });
        }
        if(user.password === password){
            return res.send({ status: 'success' });
        }
        else{
            return res.send({ status: 'error' });
        }
    }
    catch(err) {
        res.send({ status: 'error' });
    }
})

//Image upload
require('./model/ImgModel'); 

const ImageSchema = mongoose.model('ImgModel');

const multerimg = require('multer')

const storageimg = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'D:/Projects/React js/projects/Mongodb/mycrud/client/src/components/Image/files');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
});


const uploadimg = multerimg({ storage: storageimg });

// POST endpoint to upload image
app.post("/uploadImg", uploadimg.single("image"), async (req, res) => {
    console.log(req.body);
    const imageName = req.file.filename;

    try {
        await ImageSchema.create({ image: imageName }); 
        res.json({ status: 'ok', imageName: imageName });
    } catch (err) {
        console.error('Error during image upload:', err);
        res.status(500).json({ status: 'error', message: 'Image upload failed' });
    }
});


// GET endpoint to retrieve all images
app.get('/getImage', async (req, res) => {
    try {
        const images = await ImageSchema.find({});
        res.json({ status: 'ok', data: images });
    } catch (err) {
        console.error('Error fetching images:', err);
        res.status(500).json({ status: 'error', message: 'Failed to retrieve images' });
    }
});