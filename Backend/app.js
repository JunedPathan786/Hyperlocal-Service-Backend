const doten = require('dotenv')
doten.config()
const express = require('express')
const cors = require('cors')
const app = express()
const connedDB = require('./db/db')

connedDB()

app.use(cors());

app.get('/', (req, res) => {
    res.send("hello world!")
})

module.exports = app