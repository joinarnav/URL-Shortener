const express= require("express");
const connectMongoDB= require('./connection');
const urlRouter= require('./routes/url');
const url= require('./models/url');
const app= express();
const path= require('path');
const staticRouter= require('./routes/staticRoutes');

const port= 8001;


connectMongoDB('mongodb://127.0.0.1:27017/url-shortner')
.then(()=> console.log('mongoDB connected'));


app.set("view engine", "ejs");
app.set("views", path.resolve("./views")); 


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', staticRouter);
app.use('/url', urlRouter);


app.get('/:shortId', async (req,res)=>{
    const shortId= req.params.shortId;
    const entry= await url.findOneAndUpdate({shortId}, {$push:{ visitHistory:{timestamp: Date.now()}}});
    if(entry){
        console.log(entry)
        res.redirect(entry.redirectUrl);
    } 
})
    


// app.use('/analytics/:shortId', urlRouter);

app.listen(port, () => { console.log(`server started at port: ${port}` )});

