const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');
const Profile = require('../model/Profile');
const FavManga = require('../model/Fav-Manga');

const { profileValidation } = require('../routes/validation.js');


// User profile data - GET
router.get('/', verify, async (req, res) => {
    const profile = await Profile.find({userId: req.user._id});
    res.send({
        about: profile[0].about,
        age: profile[0].age,
        instagram: profile[0].instagram,
    });
})

// GET - all usernames and profiles
// store them into an array of userobjects and send to client
router.get('/otaku', verify, async (req, res) => {
    const allUsers = await User.find();
    let arrOfUsers = [];
    allUsers.forEach(user => {
        userObj = {
            userId: user._id,
            username: user.username,
            about: undefined,
            instagram: undefined,
            favmangas: undefined
        }
        arrOfUsers.push(userObj);
    });
    // now we have user id and usernames, we need to get other info from profiles
    const allProfiles = await Profile.find();
    // Temp way of doing it - inefficient, n**2 solution 
    arrOfUsers.forEach(user => {
        allProfiles.forEach(profile => {
            if (user.userId.equals(profile.userId)) {
                user.about = profile.about;
                user.instagram = profile.instagram;
            } 
        });
    });

    // remove logged in user from arr - use != for type coercion
    arrOfUsers = arrOfUsers.filter( user => user.userId != req.user._id);

    // get all fav manga details
    const allFavManga = await FavManga.find();

    arrOfUsers.forEach(user => {
        allFavManga.forEach(favmanga => {
            if (user.userId.equals(favmanga.userId)) {
                user.favmangas = favmanga.mangas;
            }
        });
    });

    try {
        res.send(arrOfUsers);
    } catch(err) {
        res.status(400).send(err);
    }
});


// Register - POST
router.post('/', verify, async (req, res) => {
    // Get User Details
    const user = await User.findById(req.user);

    // // Validate the data before we create a profile
    const {error} = profileValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the user has a profile
    const profileExists = await Profile.findOne({userId: req.user._id});
    if (profileExists) return res.status(400).send('Profile already exists');

    console.log("HERE");

    // Create a new user
    const profile = new Profile({
        about: req.body.about,
        age: req.body.age,
        instagram: req.body.instagram,
        userId: user._id
    });
    try {
        const savedProfile = await profile.save();
        res.send({profile: profile.id});
    } catch(err) {
        console.log("Profile not posted");
        res.status(400).send(err);
    }
    console.log("Profile Posted");
});

// Edit Profile - PUT
router.put('/', verify, async (req, res) => {
    // Get user details
    const user = await User.findById(req.user);

    // // Validate the data before we create a profile
    const {error} = profileValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const entry = await Profile.updateOne(
            // match criteria
            {
                userId: req.user._id,
            },

            // update first match
            {
                $set: {
                    about: req.body.about,
                    age: req.body.age,
                    instagram: req.body.instagram
                }
            }
        )
        res.send({userId: req.user._id});
        console.log("Profile edited successfully");
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

module.exports = router;