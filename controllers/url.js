const shortid= require('shortid');

const url= require('../models/url');

async function handleCreateNewUrl(req,res){
    const body= req.body;
    if(!body || !body.url)   {return res.status(400).json({error:'url is required'});}
    const shortId= shortid();
    await url.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: []
    });

    // return res.json({id: shortId});
    return res.render("home", {id: shortId});
}

async function handleAnalytics(req,res){
    const shortId= req?.params?.shortId;
    // console.log(req?.params);2

    const entry= await url.findOne({shortId});
    // console.log(entry);
    return res.json({totalClicks: entry?.visitHistory.length, 
        analytics: entry?.visitHistory 
    });
}

module.exports= {
    handleCreateNewUrl,
    handleAnalytics
}