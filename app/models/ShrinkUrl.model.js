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
    created_at : {
        type : Date,
        default : Date.now,
    },
    clicked_at : {
        type : Date,
    },
},

/* In case only time stamps are required */
// { 
//     timestamps: 
//     { 
//         createdAt: 'created_at', 
//         updatedAt: 'updated_at' 
//     }
// }
);

const ShrinkUrl = mongoose.model('shrink_url', shrinkUrlSchema)
module.exports = ShrinkUrl;