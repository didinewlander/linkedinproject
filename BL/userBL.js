const user = require('../Models/userModel');

const getAllUsers = () => { return user.find({}) };

const getUsersByName = (_name) => { return user.find({userName: _name})};

const createUser =async(obj)=>{
    const newUser = new user(obj);
    await newUser.save();
    console.log("created new user");
    return "New user created";
}

const updateUser = async(id, obj)=>{
    await user.findByIdAndUpdate(id, obj);
    return "User updated";
}

const deleteUser = async(id)=>{
await user.findByIdAndDelete(id);
return "User deleted";
}

module.exports = {
    createUser,
    getAllUsers,
    getUsersByName,
    updateUser,
    deleteUser
};