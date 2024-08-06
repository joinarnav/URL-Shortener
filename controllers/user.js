const user= require('../models/user');
const {v4: uuidv4}= require('uuid');
const {setUser, getUser}= require('../authService/auth');

async function handleSignUp(req,res){
    const {name,email,password}= req.body;
    const userauthsignup=await user.findOne({email});
    if(userauthsignup){
        return res.render("SignUp", {error: "user already exists"})
    }
    else{
        const userval = await user.create({
            name, 
            email,
            password
        })
        
        const token= setUser(userval);
        res.cookie('uid', token);
        return res.redirect('/')
    }
    
}
async function handleSignIn(req,res){
    const {email,password}= req.body;
    const userauth=await user.findOne({email, password});
    // console.log(user)
    if(!userauth){
        return res.render("login", {error: "Invalid Email or Password"});
    }

    const token= setUser(userauth);
    res.cookie('uid', token);
    return res.redirect('/');
}

module.exports= {handleSignUp, handleSignIn}
