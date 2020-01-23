const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const verify = require('./verifyToken');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../routes/validation.js');

// Register - POST
router.post('/register', async (req, res) => {
    // Validate the data before we create a user
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the username is already in the database
    const userExists = await User.findOne({username: req.body.username});
    if (userExists) return res.status(400).send('Username already exists');

    // Checking if the email is already in the database
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('Email already exists');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({user: user.id});
    } catch(err) {
        res.status(400).send(err);
    }
});

// Login - POST
router.post('/login', async (req, res) => {
        // Validate the data before we create a user
        const {error} = loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        console.log(req.body);

        // Checking if the email is already in the database
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(400).send('Email is not found');

        // Check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).send('Email or password is invalid');

        // Create and assign a token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send({
            "token": token,
        });

        // res.send('Logged In!');
})

// GET - user login data
router.get('/', verify, async (req, res) => {
    const user = await User.findById(req.user);
    res.send({
        username: user.username,
        email: user.email
    });
})


module.exports = router;