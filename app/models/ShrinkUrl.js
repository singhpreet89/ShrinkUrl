const mongoose = require('mongoose');
const shortId = require('shortid');



const shortUrlSchema = mongoose.Schema({
    url : {
        type : String,
        required : true
    },
    short_url : {
        type : String,
        required : true,
        default :  shortId.generate
    },
    clicks : {
        type : String,
        required : true,
        default : 0
    },
    date : {
        type : Date,
        default : Date.now
    },
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);