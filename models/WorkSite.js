const mongoose = require('mongoose');

const WorkSiteSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imagePaths:{
        type: []
    },
    date: {
        type: Date,
        default:Date.now
    }
});

module.exports = mongoose.model('worksite',WorkSiteSchema);