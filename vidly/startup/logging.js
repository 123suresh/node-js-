// const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
    // winston.add(winston.transports.File,{filename:''});
    // winston.add(winston.transports.MongoDB,{db:'mongodb://localhost/vidly'})

    process.on('uncaughtException', (ex) => {
        console.log('WE GOT AN UNCAUGHT EXCEPTION');
        // winston.error(ex.message, ex);
    })

    process.on('unhandleRejection', (ex) => {
        console.log('WE GOT AN UNHANDLE PROMISE REJECTION');
        // winston.error(ex.message, ex);
    })

    // throw new Error('Something failed during startup.')

    // const p = Promise.reject(new Error('Something failed miserably!'));
    // p.then(() => console.log('Done'))
}