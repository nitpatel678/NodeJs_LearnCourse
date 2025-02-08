const express = require('express');
// Importing the controller 
const {handlegenerateNewShortUrl, handleGetAnalytic} = require('../controller/url');
// Now creating a router
const router = express.Router();

// Creating a post request to get the url and return with shorten url

router.post('/', handlegenerateNewShortUrl);

// To get the total clicks

router.get('/analytics/:shortId', handleGetAnalytic)

// Exporting the router
module.exports = router;