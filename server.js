const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan  = require('morgan');
require('dotenv/config');

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));  // This makes sure that the incoming requests of ContentType, application/x-www-form-urlencoded to work like application/json    

app.use(cors());
app.use(morgan('dev'));

const ShrinkUrlRoutes = require('./app/routes/ShrinkUrl.routes');   
app.use('/api/urls', ShrinkUrlRoutes); 

// MIDDLEWARE Handle all the paths which do no exist in the API
app.use((req, res, next) => {
    const err = new Error("Page not found");
    err.status = 404;
    next(err);
});

// MIDDLEWARE to handle Generic Errors
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

/* Old way to connect */
// mongoose.connect(
//     process.env.DB_CONNECTION + process.env.DB_NAME || "mongodb://localhost:27017/shrinkIt", 
//     { useNewUrlParser: true, useUnifiedTopology: true }, 
//     () => console.log('Connected to MongoDB @: ' + process.env.DB_CONNECTION + process.env.DB_NAME)
// );

mongoose.connect(
    process.env.DB_CONNECTION + "://" + process.env.DB_HOST + ":" + process.env.DB_PORT,
    { 
        dbName: process.env.DB_DATABASE,
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWORD,
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
    ).then(() => {
        console.log('Connected to MongoDB Database: "' + process.env.DB_DATABASE + '" @:'  + process.env.DB_CONNECTION + "://" + process.env.DB_HOST + ":" + process.env.DB_PORT);
    }).catch((error) => {
        console.log("Error => " + error);
    })
;

app.listen( 
    process.env.EX_PORT, () => {
    console.log('Listening requests on Port: ' +process.env.EX_PORT);
});
