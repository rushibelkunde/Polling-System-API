const express = require('express');
const bodyParser = require('body-parser');
const Question = require('./models/question');
const mongoose = require('mongoose')
const db = require('./configs/mongoose')


const app = express();
app.use(bodyParser.json());


app.use('/', require('./routes/index'))


// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});