const shortid = require('shortid');
const URL = require('../models/url');

async function handlegenerateNewShortUrl(req, res) {
    const body = req.body;

    // checking if it has url or not
    if (!body.url) {
        return res.status(400).json({ error: "Url is missing" });
    }

    const shortID = shortid.generate(); // Fixed method call

    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,  // Use redirectUrl to match the model
        visitHistory: [],
    });

    return res.json({ id: shortID });
}

async function handleGetAnalytic(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}

module.exports = {
    handlegenerateNewShortUrl,
    handleGetAnalytic,
};
