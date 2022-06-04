const User = require('../models/user');
const bcrypt = require('bcrypt');
const { transporter } = require('../services/nodemailer');

const userController = {
    register: async (req, res) => {
        try {
            const { fullName, email, password, phoneNumber } = req.body;
    
            if(!fullName || !email || !password || !phoneNumber)
                return res.status(400).json({ msg: 'Please fill out the information' });
    
            const user = await User.findOne({ email });


    
            if (user && !user.googleId) {
                if (user.verified) {
                    return res.status(400).json({ msg: 'The email is used' });
                } else {    
                    const content = `<a href="${'http://localhost:32/api/users/verify?id=' + user._id}" target="_blank">Click here to verify your account</a>`;
                    const mainOptions = {
                        from: 'ProCourses E-learning',
                        to: user.email,
                        subject: 'Verify Account in ProCourse',
                        text: 'Your text is here',
                        html: content,
                    };
                    transporter.sendMail(mainOptions, function (err, info) {
                        if (err) {
                            return res.status(500).json({ msg: err.message });
                        } else {
                            return res.status(200).json({ msg: 'success' });
                        }
                    });
                    return res.json({ user });
                }
            }
    
            const newUser = new User({
                fullName,
                email,
                password,
                phoneNumber,
            });
            await newUser.save();

            const content = `<a href="${'http://localhost:32/api/users/verify?id=' + user._id}" target="_blank">Click here to verify your account</a>`;
            const mainOptions = {
                from: 'ProCourses E-learning',
                to: newUser.email,
                subject: 'Verify Account in ProCourse',
                text: 'Your text is here',
                html: content,
            };
            transporter.sendMail(mainOptions, function (err, info) {
                if (err) {
                    return res.status(500).json({ msg: err.message });
                } else {
                    return res.status(200).json({ msg: 'success' });
                }
            });

            return res.json({ user: newUser });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    verifyUser: async (req, res) => {
        try {
            const { id } = req.query;

            const user = await User.findOne({ _id: id });

            if (!user) return res.status(400).json({ msg: 'User not found' });

            user.verified = true;

            await user.save();

            const token = await user.generateAuthToken();

            return res.json({ msg: 'Verify successfully.', user, token });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                return res.status(400).json({ msg: 'Please fill out the information' });
    
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'Invalid login credentials' });
            }

            if (!user.verified) {
                return res.status(400).json({ msg: 'Not verified yet' });
            }
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid login credentials' });
            }

            const token = await user.generateAuthToken();
            return res.json({ user, token });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    callback: async (req, res) => {
        const user = req.user;
        const token = await user.generateAuthToken();
        return res.json({ user, token });
    },
};

module.exports = userController;