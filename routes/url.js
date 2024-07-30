const express= require('express');
const {handleCreateNewUrl,handleAnalytics}= require('../controllers/url')
const router= express.Router();

// router.route('/')
// .post(handleCreateNewUrl);    
router.post('/', handleCreateNewUrl);
router.get('/analytics/:shortId',handleAnalytics)
module.exports= router;
