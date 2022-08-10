const config = require('config');
const logger = require('./middleware/logger');
const express = require('express');
const courses = require('./routes/courses');
const home = require('./routes/home');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const helmet = require('helmet');
const morgan = require('morgan');
const auth = require('./auth');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.use(helmet());

app.use('/api/courses', courses);
app.use('/',home);

startupDebugger(`Name: ${config.get('name')}`);
startupDebugger(`Mail Server: ${config.get('mail.host')}`);
// startupDebugger(`Mail Password: ${config.get('mail.password')}`);

//Db work ...
dbDebugger('Connected to the database...');

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('morgan enabled ...')
}

app.use(logger);

app.use(auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listning on port ${port}`));