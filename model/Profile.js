const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    about: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    age: {
        type: Number,
        required: true,
        max: 100,
        min: 18
    },
    instagram: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Profile', profileSchema);