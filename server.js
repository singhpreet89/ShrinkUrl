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

const Routes = require('./app/routes/routes');   
app.use('/api/urls', Routes);                     

mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('Connected to MongoDB')
);

app.listen( 
    process.env.PORT, () => {
    console.log('Listening requests on Port:5000');
});
