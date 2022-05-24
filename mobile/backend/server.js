require('dotenv').config()


const express = require('express')
const { Server } = require('ws');
const mongoose = require('mongoose')
const crypto = require('crypto');
const User = require('./models/user.js');
const { json } = require('express');

const PORT = 32

const server = express()
    .use((req, res) => res.send("Server Started"))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

mongoose.connect(process.env.DATABASE_URL)
    .then((_) => console.log("Connected to Database."))
    .catch((e) => console.log("Error: ", e));

wss.on('connection', function (ws, req) {
    ws.on('message', message => {
        var datastring = message.toString();
        if (datastring.charAt(0) == "{") {
            datastring = datastring.replace(/\'/g, '"');
            var data = JSON.parse(datastring)
            if (data.auth == "uitelearningauthkey") {
                if (data.cmd === 'signup') {
                    User.findOne({ email: data.email }).then((r) => {
                        if (r == null) {
                            const hash = crypto.createHash("md5")
                            let hexPwd = hash.update(data.hash).digest('hex');
                            const user = new User({
                                email: data.email,
                                password: hexPwd,
                                fullName: data.fullName,
                                phoneNumber: data.phoneNumber,
                                profilePicture: data.profilePicture,
                                takenCourses: data.takenCourses,
                                currentCourses: data.currentCourses,
                            });
                            user.save();
                            ws.send(JSON.stringify({
                                "error" : false,
                                "message" : "Successfully authenticated",
                                "result" : user,
                            }));
                        } else {
                            ws.send(JSON.stringify({
                                "error" : true,
                                "message" : "This email already exists",
                                "result" : null,
                            }));
                        }
                    });
                }

                if (data.cmd === 'login') {
                    User.findOne({ email: data.email }).then((r) => {
                        if (r != null) {
                            const hash = crypto.createHash("md5")
                            let hexPwd = hash.update(data.hash).digest('hex');
                            if (hexPwd == r.password) {
                                ws.send(JSON.stringify({
                                    "error" : false,
                                    "message" : "Successfully authenticated",
                                    "result" : r,
                                }));
                            } else {
                                ws.send(JSON.stringify({
                                    "error" : true,
                                    "message" : "Password isn't correct",
                                    "result" : null,
                                }));
                            }
                        } else {
                            ws.send(JSON.stringify({
                                "error" : true,
                                "message" : "This email doesn't exist",
                                "result" : null,
                            }));
                        }
                    });
                }

                if (data.cmd === 'quickLogin') {
                    User.findOne({ email: data.email }).then((r) => {
                        if (r != null) {
                            if (data.hash == r.password) {
                                ws.send(JSON.stringify({
                                    "error" : false,
                                    "message" : "Successfully authenticated",
                                    "result" : r,
                                }));
                            } else {
                                ws.send(JSON.stringify({
                                    "error" : true,
                                    "message" : "Password isn't correct",
                                    "result" : null,
                                }));
                            }
                        } else {
                            ws.send(JSON.stringify({
                                "error" : true,
                                "message" : "This email doesn't exist",
                                "result" : null,
                            }));
                        }
                    });
                }

                
                if (data.cmd === 'signInWithFacebook') {
                    User.findOne({ email: data.email }).then((r) => {
                        if (r == null) {
                            const user = new User({
                                email: data.email,
                                password: data.token,
                                fullName: data.fullName,
                                phoneNumber: data.phoneNumber,
                                profilePicture: data.profilePicture,
                                takenCourses: data.takenCourses,
                                currentCourses: data.currentCourses,
                            });
                            user.save();
                            ws.send(JSON.stringify({
                                "error" : false,
                                "message" : "Successfully authenticated",
                                "result" : user,
                            }));
                        } else {
                            ws.send(JSON.stringify({
                                "error" : false,
                                "message" : "Successfully authenticated",
                                "result" : r,
                            }));
                        }
                    });
                }

                if (data.cmd === 'signInWithGoogle') {
                    User.findOne({ email: data.email }).then((r) => {
                        if (r == null) {
                            const user = new User({
                                email: data.email,
                                password: data.token,
                                fullName: data.fullName,
                                phoneNumber: data.phoneNumber,
                                profilePicture: data.profilePicture,
                                takenCourses: data.takenCourses,
                                currentCourses: data.currentCourses,
                            });
                            user.save();
                            ws.send(JSON.stringify({
                                "error" : false,
                                "message" : "Successfully authenticated",
                                "result" : user,
                            }));
                        } else {
                            ws.send(JSON.stringify({
                                "error" : false,
                                "message" : "Successfully authenticated",
                                "result" : r,
                            }));
                        }
                    });
                }

                if (data.cmd === 'resetPassword') {
                    User.findOne({ email: data.dest }).then((r) => {
                        var rPassword = Math.random().toString(36).slice(-8);

                        if (r == null) {
                            User.findOne({ phoneNumber: data.dest }).then((r1) => {
                                if (r1 == null) {
                                    ws.send(JSON.stringify({
                                        "error" : true,
                                        "message" : "Email/phone number doesn't exists",
                                        "result" : null,
                                    }));
                                } else {
                                    const hash = crypto.createHash("md5")
                                    let hexPwd = hash.update(rPassword).digest('hex');
                                    r1.password = hexPwd
                                    r1.save();
                                    ws.send(JSON.stringify({
                                        "error" : false,
                                        "message" : "Reset password successfully",
                                        "result" : {
                                            "destType": "phoneNumber",
                                            "password": rPassword,
                                        },
                                    }));
                                }
                            });
                        } else {
                            const hash = crypto.createHash("md5")
                            let hexPwd = hash.update(rPassword).digest('hex');
                            r.password = hexPwd
                            r.save();
                            ws.send(JSON.stringify({
                                "error" : false,
                                "message" : "Reset password successfully",
                                "result" : {
                                    "destType": "email",
                                    "password": rPassword,
                                },
                            }));
                        }
                    });
                }
            }
        }
    })
})