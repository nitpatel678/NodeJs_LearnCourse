const User = require('../models/user');

async function getAllUsers(req,res) {
    const dbAllUsers = await User.find({});
    return res.json(dbAllUsers);
}

async function getUserById(req,res) {
    
}

module.exports = {
    getAllUsers,
}