const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// register
router.post('/register', async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            phoneNumber,
            takenCourses,
            currentCourses,
            profilePicture,
        } = req.body;

        if(!fullName || !email || !password || !phoneNumber || !takenCourses || !currentCourses)
            return res
                .status(400)
                .json({ msg: 'Please fill out the information' });

        const user = await User.findOne({ email });

        if (user)
            return res
                .status(400)
                .json({ msg: 'The email is used' });

        const newUser = new User({
            fullName,
            email,
            password,
            phoneNumber,
            takenCourses,
            currentCourses,
            profilePicture,
        });

        await newUser.save();

        return res.json({ user: newUser });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res
                .status(400)
                .json({ msg: 'Please fill out the information' });

        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ msg: 'Invalid login credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ message: 'Invalid login credentials' });
        }

        const token = await user.generateAuthToken();
        return res.json({
            user,
            token,
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

module.exports = router;