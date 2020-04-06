const mongoose = require('mongoose');

module.exports = () => {
    // mongoose.connect(
    //     process.env.DB_CONNECTION + "://" + process.env.DB_HOST + ":" + process.env.DB_PORT + process.env.DB_NAME || "mongodb://localhost:27017/shrinkIt", 
    //     { useNewUrlParser: true, useUnifiedTopology: true }, 
    //     () => console.log('Connected to MongoDB @: ' + process.env.DB_CONNECTION + process.env.DB_NAME)
    // );

    let DB_URI = "mongodb://localhost:27017";
    if(process.env.DB_CONNECTION && process.env.DB_HOST && process.env.DB_PORT) {
        DB_URI = process.env.DB_CONNECTION + "://" + process.env.DB_HOST + ":" + process.env.DB_PORT;
    }

    mongoose.connect(
        DB_URI,
        { 
            dbName: process.env.DB_NAME,
            user: process.env.DB_USERNAME || "",
            pass: process.env.DB_PASSWORD || "",
            useNewUrlParser: true, 
            useUnifiedTopology: true
        }
        ).then(() => {
            console.log('MongoDB Database: "' + process.env.DB_NAME + '" @:' + process.env.DB_CONNECTION + "://" + process.env.DB_HOST + ":" + process.env.DB_PORT);
        }).catch((error) => {
            console.log("Error: " + error.message);
        })
    ;

    /* Optional Events */
    mongoose.connection.on('connected', () => {
        console.log("Mongoose connected");
    });
    
    mongoose.connection.on('error', err => {
        console.log(err.message);
    });
    
    mongoose.connection.on('disconnected', () => {
        console.log("Mongoose disconnected");
    });
    
    // Fired when manually press CLTR + C
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
          console.log("APP TERMINATED");
          process.exit(0);
        });
    });
};