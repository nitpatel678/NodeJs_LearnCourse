const express = require('express');
// Importing the connection the connection from the mongodb
const {connectToMongoDB} = require('./connectionmongo');
// It is used to connect to mongodb shell

const URL = require('./models/url');

const app = express();
const PORT = 5000;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log("Mongodb connection established"))
.catch(err=>console.log("Mongodb connection error"));

// Use another middle middleware
app.use(express.json());
// Initializing the url 
const urlRoute = require('./routes/url');
// Using the route
app.use('/url', urlRoute);

// Creating route to open the shortened link
app.get('/:shortId',async (req, res)=>{  // Fixed typo: `shorID` to `shortId`
    const shortId = req.params.shortId;  // Fixed typo: `shorID` to `shortId`
    const entry = await URL.findOneAndUpdate(
        {
            shortId,  // Matching field name from the database model
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );
    // Redirect to the original URL
    res.redirect(entry.redirectUrl);  // Fixed typo: `redirectURL` to `redirectUrl`
});

app.listen(PORT, ()=>console.log(`Server has been started at ${PORT}`));
