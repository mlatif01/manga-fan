const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');
const FavManga = require('../model/Fav-Manga');

const { favMangaValidation } = require('../routes/validation.js');


// User profile data - GET
router.get('/', verify, async (req, res) => {
    const favManga = await FavManga.findOne({userId: req.user._id});
    // console.log(favManga);
    res.send(favManga.mangas);
})

// Register - POST
router.post('/', verify, async (req, res) => {
    
    // Get User Details
    const user = await User.findById(req.user);

    // // Validate the data before we create a user
    const {error} = favMangaValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the user has fav manga entry
    const favMangaExists = await FavManga.findOne({userId: req.user._id});

    // TODO - Don't allow duplicate manga entries to mangas array
    // TODO - Fetch (MangaEden) author, releaseYear, latestChapter, lastRead should be set to 1
    const manga = {
        author: req.body.author,
        title: req.body.title,
        releaseYear: req.body.releaseYear,
        latestChapter: req.body.latestChapter,
        lastRead: req.body.lastRead
    }
    
    if (!favMangaExists) {
        // Create a new fav manga entry
        const entry = new FavManga({
            userId: user._id
        });
        entry.mangas.push(manga);
        console.log("New Entry ");
        try {
            const savedEntry = await entry.save();
            res.send({ID: entry.id});
        } catch(err) {
            res.status(400).send(err);
        }
    } 
    else {
        console.log("Existing Entry");
        const entry = favMangaExists;
        entry.mangas.push(manga);
        try {
            const savedEntry = await entry.save();
            res.send({mangaID: entry.id});
        } catch(err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
});

// remove manga - DELETE
router.delete('/', verify, async (req, res) => {
    // Checking if the user has fav manga entry
    const entry = await FavManga.findOne({userId: req.user._id});
    const mangaArr = entry.mangas;
    try {
        mangaArr.pull({_id: req.body.mangaId});
        entry.save();
        res.send({mangaID: entry.id});
        console.log("Deleted Manga Successfully");
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

// Edit - PUT
router.put('/', verify, async (req, res) => {
    // Find manga entry in users document
    // const entry = await FavManga.findOne({userId: req.user._id}, 
    //     {mangas: { $elemMatch: {_id: req.body.mangaId}
    // }});

    try {
        const entry = await FavManga.updateOne(
            // match criteria
            {
                userId: req.user._id,
                mangas: { $elemMatch: {_id: req.body.mangaId}}
            },

            // update first match
            {
                $set: {
                    "mangas.$.lastRead": req.body.newLastRead
                }
            }
        )
        res.send({mangaID: req.body.mangaId});
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }

});

module.exports = router;