var mongoose = require('mongoose');
module.exports = mongoose.model('comp', {
    text: {
        type: String,
        default: ''
    }
});