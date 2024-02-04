
const express = require('express');
const jwt = require('jsonwebtoken');
const {User} = require('../db/database');
const {SECRET} = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/signup',async(req,res)=>{
    const {userName, password} = req.body;
    const user = await User.findOne({userName})
    if(user){
        res.status(403).json({error: "User alredy exists"});
    }else{
        const newUser = new User({userName, password})
        await newUser.save();
        const token = jwt.sign({id : newUser._id}, SECRET,{expiresIn: '1h'});
        res.status(201).json({messege:"User created succesfully", token});
    }
})

router.post('/login', async (req,res)=>{
    const {userName, password} = req.body;
    if(!userName || !password){
        return res.status(400).json({error: "Bad request"});
    }
    const newUser = await User.findOne({userName});
    if(newUser){
        const token = jwt.sign({id: newUser._id}, SECRET, {expiresIn : '1h'});
        res.status(201).json({messege: "User logged in succesfully", token});
    }else{
        res.status(401).json({error: "Invalid creadentials"});
    }
})
module.exports = router;