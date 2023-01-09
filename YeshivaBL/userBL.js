const User = require('../Models/userModel')

// REST API Functions

// GET - Get a user - READ
const getAllUsers = () => { return User.find({}) };

// GET - Get by id - READ
const getUserByID = (id) => { return User.find({ _id: id }) };

// POST - Create a new user query
const createUser = async (obj) => {
    const newUser = new User(obj);
    await newUser.save();
    console.log("Created a new user query");
    return "Created a new user query";
};

// PUT - Update a user
const updateUser = async (id, obj) => {
    await User.findByIdAndUpdate(id, obj);
    return "Updated the user query";
};

// DELETE - Delete a user
const deleteUser = async (id) => {
    await User.findByIdAndDelete(id);
    return "Deleted the user query";
};

module.exports = {
    createUser,
    getAllUsers,
    getUserByID,
    updateUser,
    deleteUser
};