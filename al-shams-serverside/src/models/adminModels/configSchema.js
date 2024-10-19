const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    check: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Config', configSchema);