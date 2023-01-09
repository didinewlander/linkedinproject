const Class = require('../Models/classModel')

// REST API Functions

// GET - Get a class - READ
const getAllClasses = () => { return Class.find({}) };

// GET - Get by id - READ
const getClassByID = (id) => { return Class.find({ _id: id }) };

// POST - Create a new class query
const createClass = async (obj) => {
    const newClass = new Class(obj);
    await newClass.save();
    console.log("Created a new class query");
    return "Created a new class query";
};

// PUT - Update a class
const updateClass = async (id, obj) => {
    await Class.findByIdAndUpdate(id, obj);
    return "Updated the class query";
};

// DELETE - Delete a class
const deleteClass = async (id) => {
    await Class.findByIdAndDelete(id);
    return "Deleted the class query";
};

module.exports = {
    createClass,
    getAllClasses,
    getClassByID,
    updateClass,
    deleteClass
};