const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan  = require('morgan');
require('dotenv/config');

app.use(bodyParser.json());     
app.use(cors());
app.use(morgan('dev'));

const ShrinkUrlRoutes = require('./app/routes/ShrinkUrl.routes');   
app.use('/api/urls', ShrinkUrlRoutes); 

app.use('', (req, res, next) => {
    res.status(404).json({
        code : "404",  
        error : "Page not found",
    });
});

mongoose.connect(
    process.env.DB_CONNECTION || "mongodb://localhost/urlShortner", 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('Connected to MongoDB')
);

app.listen( 
    process.env.PORT || 5000, () => {
    console.log('Listening requests on Port:5000');
});
