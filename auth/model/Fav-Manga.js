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
            max: 1,
            min: 255
        },
        releaseYear: {
            type: Number,
            required: true,
            max: 255,
            min: 4
        },
        latestChapter: {
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