const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
mongoose.connect(config.get('db'))
    .then(() => console.log(" connected to vidly mongoDB ... "))
    .catch(err => console.error('Couldnot connect to mongoDB ... ', err))
}