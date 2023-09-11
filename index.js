require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./route.js');
const fileUpload = require('express-fileupload');
const { default: mongoose } = require('mongoose');
const PORT = 4000;
const MONGO_URL = "mongodb+srv://AdminUserK:AdminUserK1@ecommerce-server.eg2cnjt.mongodb.net/?retryWrites=true&w=majority"
const app = express();

mongoose.connect(MONGO_URL)
.then(() => console.log('Database Connection Sucessfull!'))
.catch((error) => console.log(error));

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(fileUpload());

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
