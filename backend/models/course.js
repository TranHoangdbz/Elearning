const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseName: String,
    courseImage: String,
    description: String,
    teacherID: String,
    discussion: Array,
    rating: Array,
},
    { timestamps: true }
)

module.exports = mongoose.model('Course', courseSchema)