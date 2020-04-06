const express = require('express');
const app = express();
const cors = require('cors');
const morgan  = require('morgan');

const dotenv = require('dotenv').config();
console.log("ENVIRONMENT VARIABLES: " , dotenv.parsed);

const ShrinkUrlRoutes = require('./app/routes/ShrinkUrl.route');

/* DATABASE CONFIGURATION *********************************************************************/
require('./config/database.config')();

/* MIDDLEWARES ********************************************************************************/
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));  // This makes sure that the incoming requests of ContentType, application/x-www-form-urlencoded to work like application/json    

app.use(cors());
app.use(morgan('dev'));

// Handle ShrinkUrl routes
app.use('/api/urls', ShrinkUrlRoutes); 

// Handle all the non existant paths
app.use((req, res, next) => {
    const err = new Error("Page not found");
    err.status = 404;
    next(err);
});

// Handle Generic Errors
app.use((err, req, res, next) => {
    res.status(err.status);
    res.json({ data:
        { 
            status : "error",
            code : err.status || 500,
            message : err.message || "Internal Server error",
        }
    });
});

/* EXPRESS SERVER *****************************************************************************/
const PORT = process.env.EX_PORT || 3000;
app.listen( 
    PORT, () => {
    console.log('Listening requests on Port: ' + PORT);
});