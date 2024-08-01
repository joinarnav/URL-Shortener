const express= require('express');
const router= express.Router();

const {handleSignUp, handleSignIn}= require('../controllers/user')

router.post('/', handleSignUp);

router.post('/login', handleSignIn);


module.exports= router;
