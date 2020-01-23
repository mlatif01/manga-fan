const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');
const Profile = require('../model/Profile');

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

// Register - POST
router.post('/', verify, async (req, res) => {
    // Get User Details
    const user = await User.findById(req.user);

    // // Validate the data before we create a user
    const {error} = profileValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the user has a profile
    const profileExists = await Profile.findOne({userId: req.user._id});
    if (profileExists) return res.status(400).send('Profile already exists');

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
        res.status(400).send(err);
    }
    console.log("Profile Edited");
});

// Edit - PUT
router.put('/', verify, async (req, res) => {
    const user = await User.findById(req.user);
    const userId = user._id;

    
});

module.exports = router;