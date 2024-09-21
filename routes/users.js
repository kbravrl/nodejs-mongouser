const express = require('express');
const router = express.Router();
const User = require('../models/user'); 

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); 
        res.json(users); 
    } catch (error) {
        res.status(500).send('Error: ' + error.message); 
    }
});

// Get user by ID
router.get('/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }
        
        res.json(user);
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
        
    }

});

// Create a user
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
});

// Update a user by ID 
router.patch('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true, runValidators: true} 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
});

// Delete a user ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).send('Hata: ' + error.message);
    }
});

module.exports = router;
