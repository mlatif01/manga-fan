const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');
const Profile = require('../model/Profile');

const { profileValidation } = require('../routes/validation.js');


// User profile data - GET
router.get('/', verify, async (req, res) => {
    const profile = await Profile.findOne(req.userId);
    res.send({
        about: profile.about,
        age: profile.age,
        instagram: profile.instagram,
    });
})

// Register - POST
router.post('/', verify, async (req, res) => {
    console.log(req.userId);
    // // Validate the data before we create a user
    const {error} = profileValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the user has a profile
    const profileExists = await Profile.findOne({userId: req.body.userId});
    if (profileExists) return res.status(400).send('Profile already exists');

    // Create a new user
    const profile = new Profile({
        about: req.body.about,
        age: req.body.age,
        instagram: req.body.instagram,
        userId: req.body.userId
    });
    try {
        const savedProfile = await profile.save();
        res.send({user: profile.id});
    } catch(err) {
        res.status(400).send(err);
    }
    console.log("Profile Edited");
});

module.exports = router;