const genres = require('./routes/genres');
const customer = require('./routes/customer');
const user = require('./routes/user');
const auth = require('./routes/auth');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log(" connected to vidly mongoDB ... "))
    .catch(err => console.error('Couldnot connect to mongoDB ... ', err))
    

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customer', customer);
app.use('/api/user', user);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));