const {getUser}= require('../authService/auth');

async function checkLogin(req,res,next){
    const userid= req.cookies?.uid;
    
    if(!userid){
        return res.redirect("/login");
    }
    

    const user= getUser(userid);
    if(!user){
        return res.redirect("/login");
    }
    
    req.user= user;
    next();
}

async function checkUser(req, res, next){
    const userid= req.cookies?.uid;
    const user= getUser(userid);
    
    req.user= user;
    next();
}

module.exports= {checkLogin,checkUser};