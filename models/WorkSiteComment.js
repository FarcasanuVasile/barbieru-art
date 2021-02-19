const mongoose = require('mongoose');

const WorkSiteCommentSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    rate:{
        type: Number
    },
    workSiteId:{
        type:String
    }    ,
    date: {
        type: Date,
        default:Date.now
    }
});

module.exports = mongoose.model('worksite-comment',WorkSiteCommentSchema);