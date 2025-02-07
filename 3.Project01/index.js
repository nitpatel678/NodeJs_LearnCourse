const express = require('express');
const app = express();

const fs = require('fs');

const users = require('./MOCK_DATA.json');
const port = 8000;
// Middlware - Plugin
app.use(express.urlencoded({extended: false}));

app.use((res,req,next)=>{
    console.log("Testing the middleware");
    next();
})

// REST API POINTS
app.get('/api/users', (req, res) => {
    return res.json(users);
})

app.get('/users', (req, res) => {
    // Creating a html render page for to list all the user 
  const html = `  
    <ul>
       ${users.map((user) => `<li>${user.first_name}</li>`).join("")} 
    </ul>
    `
    res.send(html);
})


// TO get profile of particular id and display in the html 

app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    
    if (user) {
        return res.send(`<li>${user.first_name}</li>`);
    } else {
        return res.status(404).send({ error: "User not found" });
    }
});


// To get a profile of a particular id and display in the form of json

app.get('/api/users/:id' , (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
})




app.post('/api/users/post/', (req, res) => {
    const body = req.body;
    users.push({...body, id : users.length+1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({status:"Success", id: users.length+1});
    });
})
   


app.delete('/api/users/delete/' , (req, res) => {
    // TODO: To update a user details
    return res.json({ status:"Pending"});
})





// BELOW METHOD IS THE BEST METHOD TO HANDLE ROUTE OF SAME ID FOR get,patch,delete


// app.route('/api/users/:id').get('/api/users/:id' , (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id);
//     return res.json(user);
// })
// .patch((req, res)=>{
//     // TODO: to edit user with id
//     return res.json({status : "Pending"});
// })
// .delete((req, res)=>{
//     // TODO: To delete a user
//     return res.json({status : "Pending"});

// })



app.listen(port, ()=>console.log('Sever has been started.'));