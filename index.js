const express= require("express");
const connectMongoDB= require('./connection');
const urlRouter= require('./routes/url');
const url= require('./models/url');
const app= express();

const port= 8001;

connectMongoDB('mongodb://127.0.0.1:27017/url-shortner')
.then(()=> console.log('mongoDB connected'));

app.use (express.json());
app.use('/url', urlRouter);

app.get('/:shortId', async (req,res)=>{
    const shortId= req.params.shortId;
    const entry= await url.findOneAndUpdate({shortId}, {$push:{ visitHistory:{timestamp: Date.now()}}});
    res.redirect(entry.redirectUrl);
})

// app.use('/analytics/:shortId', urlRouter);

app.listen(port, () => { console.log(`server started at port: ${port}` )});

