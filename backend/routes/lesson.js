const { Router } = require('express');
const lesson = require('../models/lesson')
const router = Router();

router.patch('/update/:lessonId', async (req, res) => {
    const lessonId = req.params.lessonId;
    const { name, description, video, lessonVolume } = req.body;

    lesson.findById(lessonId, function(err, doc) {
        if (err) {
            res.status(500).json({ error: err.message })
            return;
        }

        doc.name = name;
        doc.description = description;
        doc.video = video;
        doc.lessonVolume = lessonVolume;

        doc.save().then(result => {
            res.status(200).send(result)
        }).catch(err => {
            res.status(500).json({ error: err.message })
        })
    }).catch(err => {
        res.status(500).json({ error: err.message })
    })
})

module.exports = router;