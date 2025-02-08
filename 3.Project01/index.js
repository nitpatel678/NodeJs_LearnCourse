const express = require('express');
const app = express();
const fs = require('fs');



const {logReqRes} = require('./middleware');

const userRouter = require('./routes/user');

const {connectMongodb} = require('./connection');
connectMongodb("mongodb://127.0.0.1:27017/youtube-app-1");
const port = 8000;

// Middleware - Plugins
app.use(logReqRes("log.txt")); // Middleware to parse JSON body
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded data


/*

BELOW METHOD IS THE BEST METHOD TO HANDLE ROUTE OF SAME ID FOR get, patch, delete
app.route('/api/users/:id')
.get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
})
.patch((req, res) => {
    // TODO: to edit user with id
    return res.json({ status: "Pending" });
})
.delete((req, res) => {
    // TODO: To delete a user
    return res.json({ status: "Pending" });
});

*/

app.use('/users', userRouter);
app.listen(port, () => console.log('Server has been started.'));
