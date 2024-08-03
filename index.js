const express= require("express");
const connectMongoDB= require('./connection');
const urlRouter= require('./routes/url');
const url= require('./models/url');
const app= express();
const path= require('path');
const staticRouter= require('./routes/staticRoutes');
const authRouter= require('./routes/user');
const cookieParser= require('cookie-parser');
const {checkLogin,checkUser}= require('./middleware/auth');

const port= 8001;


connectMongoDB('mongodb://127.0.0.1:27017/url-shortner')
.then(()=> console.log('mongoDB connected'));


app.set("view engine", "ejs");
app.set("views", path.resolve("./views")); 


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/', checkUser, staticRouter);

app.use('/url', checkLogin,  urlRouter);


app.get('/:shortId', async (req,res)=>{
    const shortId= req.params.shortId;
    const entry= await url.findOneAndUpdate({shortId}, {$push:{ visitHistory:{timestamp: Date.now()}}});
    if(entry){
        // console.log(entry)
        res.redirect(entry.redirectUrl);
    } 
})

app.use('/user', authRouter);
    


app.use('/analytics', urlRouter);

app.listen(port, () => { console.log(`server started at port: ${port}` )});

