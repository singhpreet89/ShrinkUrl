const express = require('express');
const app = express();
const cors = require('cors');
const morgan  = require('morgan');
const createError = require('http-errors');

const dotenv = require('dotenv').config();
// console.log("ENVIRONMENT VARIABLES: " , dotenv.parsed);

const ShrinkUrlRoutes = require('./app/routes/ShrinkUrl.route');
const HttpExceptions = require('./app/middlewares/exceptions/Http.exceptions');

require('./config/database.config')();

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));  // This makes sure that the incoming requests of ContentType, application/x-www-form-urlencoded to work like application/json    

app.use(cors());
app.use(morgan('dev'));

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

const PORT = process.env.EX_PORT || 3000;
app.listen(PORT, () => {  
    console.log('Listening requests on Port: ' + PORT);
});