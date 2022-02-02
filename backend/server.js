const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
const { connectToMongoDB } = require('./config/db');
require('dotenv').config();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectToMongoDB()

app.use('/api',require('./routes/api'))

app.listen(process.env.PORT||7000,() => {
    console.log("App is listening on Port 7000")
})