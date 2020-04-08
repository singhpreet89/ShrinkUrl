const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shrinkUrlSchema = new Schema({
    url : {
        type : String,
        required : true
    },
    short_url : {
        type : String,
        required : true,
    },
    clicks : {
        type : String,
        required : true,
        default : 0
    },
    clicked_at : {
        type : Date,
    },
    created_at : {
        type : Date,
        default : Date.now,
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