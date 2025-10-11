const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const cors = require('cors')
const app = express()
const connedDB = require('./db/db.js')

connedDB()

app.use(cors());
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("hello world!")
})

module.exports = app