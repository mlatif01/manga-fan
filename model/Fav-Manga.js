const mongoose = require('mongoose');

const FavMangaSchema = new mongoose.Schema({
    mangas: [{
        author: {
            type: String,
            required: true,
            min: 1,
            max: 255
        },
        title: {
            type: String,
            required: true,
            min: 1,
            max: 255
        },
        releaseYear: {
            type: Number,
            required: true,
            max: 3000,
            min: 1900
        },
        latestChapter: {
            type: Number,
            required: true,
            max: 99999
        },
        lastRead: {
            type: Number,
            required: true,
            max: 99999
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('FavManga', FavMangaSchema);