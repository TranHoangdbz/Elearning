const mongoose = require('mongoose')

const lessonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    video: String,
    lessonVolume: Number,
    Quizz: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'quizz'
    }]
})

module.exports = mongoose.model('lesson', lessonSchema)