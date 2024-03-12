const router = require('express').Router()
const User = require('../models/User')

// Get users list
router.get('/', async (req, res) => {
    const users = await User.find()
    res.json(users)
})

// Get a specific user
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.json(user)
    } catch (error) {
        console.log('Error:', error)
        res.status(500).json({ message: 'error creating user'})
    }
})

// Create users
router.post('/', async (req, res) => {
    try {
        if (!req.body.profilePicture) req.body.profilePicture = undefined
        const user = await new User(req.body).save()
        res.json(user)
    } catch (error) {
        console.log('Error:', error)
        res.status(500).json({ message: 'error creating user'})
    }
})

// Delete users
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await User.findByIdAndDelete(id)     
        res.json({ message: 'user deleted' })   
    } catch (error) {
        console.log('Error:', error)
        res.status(500).json({ message: 'error deleting user' })
    }
})

module.exports = router