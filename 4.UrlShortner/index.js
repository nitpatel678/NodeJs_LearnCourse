const express = require('express');

// Setting up the path module for ejs 
const path = require('path');

// Importing the connection from the mongodb
const { connectToMongoDB } = require('./connectionmongo');
// It is used to connect to mongodb shell

const URL = require('./models/url');

const app = express();
const PORT = 5000;



//                 [ Setting up the ejs view engine]
app.set('view engine', 'ejs');
// Setting UP the ejs file 
app.set('views', path.resolve("./views"));


connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
    .then(() => console.log("Mongodb connection established"))
    .catch(err => console.log("Mongodb connection error"));

// Use another middleware
app.use(express.json());
// Initializing the url 
const urlRoute = require('./routes/url');
// Using the route
app.use('/url', urlRoute);




//         [         TESTING THE SERVER SIDE RENDERING                ]

app.get('/test', async(req, res) => {
    const allUrl = await URL.find({})
    return res.render('home', {
        urls : allUrl,
    });
});



// Creating route to open the shortened link
app.get('/:shortId', async (req, res) => {  // Fixed typo: `shorID` to `shortId`
    const shortId = req.params.shortId;  // Fixed typo: `shorID` to `shortId`
    
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },  // Matching field name from the database model
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true } // Ensures we get the updated document
        );

        if (!entry) {
            return res.status(404).send('<h1>Short URL not found</h1>');  // Handle case where shortId is invalid
        }

        // Redirect to the original URL
        res.redirect(entry.redirectUrl);  // Fixed typo: `redirectURL` to `redirectUrl`
    } catch (error) {
        console.error("Error in redirecting:", error);
        res.status(500).send('<h1>Internal Server Error</h1>');
    }
});


app.listen(PORT, () => console.log(`Server has been started at ${PORT}`));
