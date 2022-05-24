const express = require('express')
const router = express.Router()
const Course = require('../models/course')

// Getting all
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find()
        res.json(courses)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting one

router.get('/:id', getCourse,  (req, res) => { 
    res.send(res.course)
})

// Creating one

router.post('/', async (req, res) => {
    console.log("req.body", req.body);
    const course = new Course({
        courseName: req.body.courseName,
        description: req.body.description,
        teacherID: req.body.teacherID,
        discussion: [],
        rating: []
    })
    try {
      const newCourse = await course.save()
      res.status(201).json(newCourse)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// Updating one

router.patch('/:id', getCourse, async (req, res) => {
    if (req.body.name != null) {
      res.course.name = req.body.name
    }
    try {
      const updatedCourse = await res.course.save()
      res.json(updatedCourse)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// Deleting one

router.delete('/:id', getCourse, async (req, res) => {
    try {
      await res.course.remove()
      res.json({ message: 'Deleted course' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

async function getCourse(req, res, next) {
    let course
    try {
        course = await Course.findById(req.params.id)
        if (course == null) {
            return res.status(400).json({ message: 'Cannot find course' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    
    res.course = course
    next()
}

module.exports = router