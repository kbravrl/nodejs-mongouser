const mongoose = require('mongoose');
const schema = mongoose.Schema;

const newSchema = new mongoose.Schema({
    name: {
        type: String,
        required :true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique : true
    }
});

const User = mongoose.model('User', newSchema);

module.exports = User;

