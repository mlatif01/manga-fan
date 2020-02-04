const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');
const FavManga = require('../model/Fav-Manga');
const fetch = require('node-fetch');

const { favMangaValidation } = require('../routes/validation.js');

// Assist Function
// Gets manga details for fav manga list
async function getFullMangaDetails(title) {
    const baseMangaListURL = 'https://www.mangaeden.com/api/list/0';
    const baseMangaChapterURL = 'https://www.mangaeden.com/api/manga/';
    const baseMangaPagesURL = 'https://www.mangaeden.com/api/chapter/'
    const mangaInfo = {
        author: undefined,
        title: undefined,
        releaseYear: undefined,
        latestChapter: undefined,
        lastRead: 1
    }

    // used to find chapters and latest chapter number
    let mangaId = "";

    // get full manga list
    const listResponse = await fetch(baseMangaListURL);
    let listData = await listResponse.json();
    
    // get manga info and assign to mangaInfo obj
    listData.manga.forEach(manga => {
        if (manga.t.toUpperCase() === title.toUpperCase()) {
            mangaInfo.title = manga.t;
            mangaId = manga.i;
        }
    });

    // use manga id to find chapter id - we need this to find latest chapter
    const mangaResponse = await fetch(baseMangaChapterURL + mangaId);
    const mangaData = await mangaResponse.json();

    // get correct manga data and store in manga obj
    mangaInfo.author = mangaData.author;
    mangaInfo.releaseYear = mangaData.released;
    mangaInfo.latestChapter = mangaData.chapters_len;

    return mangaInfo;
}

// fav manga data - GET
router.get('/', verify, async (req, res) => {
    const favManga = await FavManga.findOne({userId: req.user._id});
    // console.log(favManga);
    res.send(favManga.mangas);
})

// add new fav manga - POST
router.post('/', verify, async (req, res) => {
    let flag = true;
    
    // Get User Details
    const user = await User.findById(req.user);

    // // Validate the data before we create a user
    const {error} = favMangaValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the user has fav manga collections entry
    const favMangaExists = await FavManga.findOne({userId: req.user._id});

    // TODO - Don't allow duplicate manga entries to mangas array
    // loop through array, check if manga is already there, if it is return error
    // const mangaEntryExists = await FavManga.findOne(
    //     {
    //         userId: req.user._id,
    //         mangas: { $elemMatch: {title: req.body.title}}
    //     }
    // );
    // if (mangaEntryExists) {
    //     console.log("Manga Already in List");
    //     return res.status(400).send("Manga Already in List");
    // } 
    favMangaExists.mangas.forEach((entry)=>{
        if (entry.title.toLowerCase() === req.body.title.toLowerCase()) {
            console.log("Manga Already Here!");
            flag = false;
            return res.status(400).send("Manga Already In List");
        }
    });

    // get full manga details from Manga Eden API
    const manga = await getFullMangaDetails(req.body.title);
    
    // store the data to db
    if (!favMangaExists && flag) {
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
    else if (favMangaExists && flag) {
        // add to existing entry
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

// Edit last read - PUT
router.put('/', verify, async (req, res) => {
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
        console.log("fav manga edited successfully");
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }


});

module.exports = router;