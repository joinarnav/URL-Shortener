const {getUser}= require('../authService/auth');

async function checkLogin(req,res,next){
    const uid= req.cookies?.uid;
    
    if(!uid){
        return res.redirect("/login");
    }

    const user= getUser(uid);
    if(!user){
        return res.redirect("/login");
    }

    req.user= user;
    next();
}

module.exports= {checkLogin,};