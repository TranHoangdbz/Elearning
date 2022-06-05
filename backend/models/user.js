const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    googleId: {
      type: String,
    },
    facebookId: {
      type: String,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    takenCourses: [{ type: Schema.Types.ObjectId, ref: 'Course', default: [] }],
    currentCourses: [
      { type: Schema.Types.ObjectId, ref: 'Course', default: [] },
    ],
    profilePicture: {
      type: String,
      default:
        'https://res.cloudinary.com/shanectteam/image/upload/v1634874318/user_zjvzyj.png',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true, collection: 'users' }
);

User.pre('save', async function (next) {
  const user = this;
  if (user.password) {
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }
  }
  next();
});

User.methods.generateAuthToken = async (_id, role) => {
  const token = jwt.sign({ _id: _id, role: role }, process.env.JWT_KEY);
  return token;
};

module.exports = mongoose.model('User', User);
