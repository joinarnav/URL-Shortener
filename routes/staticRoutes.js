const express= require('express');
const router= express.Router();
const URL= require('../models/url')
const user= require('../models/user')

router.get('/', async(req,res)=>{
    if(!req.user)   res.redirect('/login');
    const allurls= await URL.find({createdBy: req.user?._id});
    return res.render("home", {urls: allurls});
})

router.get('/signup', (req,res)=>{
    res.render("SignUp")
})
router.get('/login', (req,res)=>{
    res.render("login")
})


module.exports= router;
