const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shortId = require('shortid');

const shrinkUrlSchema = new Schema({
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

const ShrinkUrl = mongoose.model('shrink_url', shrinkUrlSchema)
module.exports = ShrinkUrl;