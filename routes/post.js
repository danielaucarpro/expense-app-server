const express = require("express");
const router = express.Router();
const User = require("../models/users");
const jwt = require('jsonwebtoken');

//use this to create a new transaction
router.post('/', async (req, res) => {
    console.log(req.headers['x-access-token']);
    //getting token fromm headers
    const token = req.headers['x-access-token'];
    console.log(token, 'token');
    //using token to check if is the same user who is posting
    const userEmail = jwt.decode(token);
    const emailToUse = userEmail.email;
    console.log(emailToUse, 'email');
    //checking if the user exist
    const checkUser = await User.findOne({ email: emailToUse });

    if (checkUser) {
        //if the user exist add new post to their post list
        await User.updateOne({ email: emailToUse },
            {
                $set: {
                    transaction: [{ title: req.body.title, date: req.body.date, categories: req.body.categories, amount: req.body.amount },
                    ...checkUser.transaction]
                }
            })
        return res.status(200).json({
            message: "Post successfully added!",
            data: checkUser.transaction
        })
    } else {
        res.status(404).json({
            message: "User Not Found"
        })
    }
})

//get user's transactions
router.get('/getTransactions', async (req, res) => {
    //getting user to return transaction
    const token = req.headers['x-access-token'];
    console.log(token, 'token');
    //using token to check if is the same user who is posting
    const userEmail = jwt.decode(token);
    const emailToUse = userEmail.email;
    // console.log(emailToUse, 'email');
    //checking if the user exist
    const checkUser = await User.findOne({ email: emailToUse });
    console.log(checkUser.transaction, 'transactions');

    if (checkUser) {
        return res.status(200).json({
            message: "Data loaded successfully",
            data: checkUser.transaction
        });
    } else {
        res.status(404).json({
            message: "User Not Found"
        })
    }
});

module.exports = router;