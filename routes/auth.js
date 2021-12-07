//importing express
const express = require("express");
const router = express.Router();
//Encrypting module
const bcrypt = require("bcryptjs");
//importing user schema from models
const User = require("../models/users");
//importing jason web token
const jwt = require('jsonwebtoken');
//mongoDB
const db = require('mongodb');

//Register API - using post
router.post('/signUp', async (req, res) => {
    //async synthax need to use try/await
    try {
        /*encrypting user's new pwd
        getting the user's password from body, where all the data from client part is*/
        const newPassword = await bcrypt.hash(req.body.password, 10);

        /*Save the new user in database
        using user schema*/
        const data = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        });

        //if everything went right return 201 status, message, and data
        return res.status(201).json({
            message: "User Created Succesfully",
            data,
        });
        //catchin error, always return 500, dont use console.log
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

//Login API
router.post('/login', async (req, res) => {

    //finding if there is already a user
    const user = await User.findOne({ email: req.body.email });

    if (user) {
        //comparing the current password string with the encrypted one from database
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        //if user exist check password
        if (isPasswordCorrect) {
            //If the pwd is correct, create a token for the login
            const token = jwt.sign({
                email: req.body.email,
            }, 'secret99')
            //then return status 201 
            return res.status(201).json({
                token,
                message: 'User Logged In Successfully'
            })
            //if the pwd is incorrect
        } else {
            return res.status(401).json({
                message: 'Incorrect Password'
            })
        }
        //if the user is not found
    } else {
        res.status(404).json({
            message: 'User not found',
            data: null
        })
    }
})

//reset password using MongoDB
router.post('/resetPassword', async (req, res) => {
    const user = await User.find(req.body.email);
    const newPassword = await bcrypt.hash(req.body.newPassword, 10);

    if (user) {
        //use mongo db to change password
    } else {
        res.status(404).json({
            message: 'User not found',
            data: null
        })
    }
});

//getting the list of users - going to use later to share expenses
router.get('/users', async (req, res) => {
    const usersList = await User.find();
    res.status(200).json({
        usersList,
        message: 'User List Loaded'
    })
})

module.exports = router;