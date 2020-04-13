const express = require('express');
const helmet = require('helmet');
const app = express();
const compression = require('compression');
const cors = require('cors');
const morgan  = require('morgan');
var rfs = require('rotating-file-stream');
var favicon = require('serve-favicon');
var path = require('path');

app.use(helmet());
app.use(compression());

const dotenv = require('dotenv').config();
// console.log("ENVIRONMENT VARIABLES: " , dotenv.parsed);

const ShrinkUrlRoutes = require('./app/routes/ShrinkUrl.route');
const HttpExceptions = require('./app/middlewares/exceptions/Http.exceptions');
const Logger = require('./config/logger.config');

require('./config/database.config')();

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));  // This makes sure that the incoming requests of ContentType, application/x-www-form-urlencoded to work like application/json    

app.use(cors());

app.use(morgan('dev'));
//TODO: Choose a better Logger instead of MORGAN
app.use(morgan('common', 
    {
        stream: rfs.createStream(Logger.generator, {
            interval: '1d', // rotate daily
            path: path.join(__dirname, 'storage', 'logs'), 
        })
    }
));

// Handle the random Favicon requests triggered by the browsers
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// Handle ShrinkUrl routes
app.use('/api/urls', ShrinkUrlRoutes); 

// Handle all the non existant paths
app.use((req, res, next) =>{
    next(HttpExceptions.nonExistantPathsHandler());
});

// Handle Generic Errors
app.use((err, req, res, next) => {
    HttpExceptions.genericExceptionHandler(err, res);
});

app.set('json spaces', 2);

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {  
    console.log(`Listening requests on Port: ${PORT}`);
});