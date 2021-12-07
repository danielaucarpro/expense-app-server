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
                    transaction: [{ title: req.body.title, amount: req.body.amount, date: req.body.date },
                    ...checkUser.transaction]
                }
            })
        return res.status(200).json({
            message: "Post Added Succesfully to User"
        })
    } else {
        res.status(404).json({
            message: "User Not Found"
        })
    }
})

//share payment
router.get('/shareExpenses', async (req, res) => {
    //get the user names form body/headers

    //find this names in the db

    //post the transaction in everybody in the list and divide the amount value by the list lenght
});

//get user's transactions
router.get('/getTransactions', async (req, res) => {
    //getting user to return transaction
    const token = req.headers['x-access-token'];
    console.log(token, 'token');
    //using token to check if is the same user who is posting
    const userEmail = jwt.decode(token);
    const emailToUse = userEmail.email;
    const transactions = userEmail.transaction;
    console.log(emailToUse, 'email');
    console.log(transactions, 'transactions');
    //checking if the user exist
    const checkUser = await User.findOne({ email: emailToUse });
    console.log(checkUser.transaction, 'transactions');

    if (checkUser) {
        return res.status(200).json({
            message: "Data laoded successfully",
            data: checkUser.transaction
        });
    }
});

module.exports = router;