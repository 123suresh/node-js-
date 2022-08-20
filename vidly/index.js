const genres = require('./routes/genres');
const customer = require('./routes/customer');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log(" connected to vidly mongoDB ... "))
    .catch(err => console.error('Couldnot connect to mongoDB ... ', err))
    

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customer', customer);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));