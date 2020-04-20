const express = require('express');
const helmet = require('helmet');
const app = express();
const compression = require('compression');
const cors = require('cors');
const morgan  = require('morgan');
const rfs = require('rotating-file-stream');
const favicon = require('serve-favicon');
const path = require('path');

const dotenv = require('dotenv').config();
// console.log("ENVIRONMENT VARIABLES: " , dotenv.parsed);

require('./config/database.config')();
const ShrinkUrlRoutes = require('./src/routes/ShrinkUrl.routes');
const HttpExceptions = require('./src/middlewares/exceptions/HttpExceptions.middleware');

app.use(helmet());
app.use(compression());

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));  // This makes sure that the incoming requests of ContentType, application/x-www-form-urlencoded to work like application/json    
app.use(cors());

app.use(morgan('dev'));
//TODO: Choose a better Logger instead of MORGAN
app.use(morgan('common', 
    {
        stream: rfs.createStream('shrink-it.log', {
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
    console.log(`INFO: Listening requests on Port: ${PORT}`);
});