const mongoose = require('mongoose');

module.exports = function() {
mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log(" connected to vidly mongoDB ... "))
    .catch(err => console.error('Couldnot connect to mongoDB ... ', err))
}