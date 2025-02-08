const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
    },
    jobtitle: {
        type: String,
    }
});

// Creating a model for that schema
const User = mongoose.model('user', userSchema);

// Exporting it 
module.exports = User;