const Sikum = require('../Models/sikumModel')

// REST API Functions

// GET - Get a sikum - READ
const getAllSikumim = () => { return Sikum.find({}) };

// GET - Get by id - READ
const getSikumByID = (id) => { return Sikum.find({ _id: id }) };

// POST - Create a new sikum query
const createSikum = async (obj) => {
    const newSikum = new Sikum(obj);
    await newSikum.save();
    console.log("Created a new sikum query");
    return "Created a new sikum query";
};

// PUT - Update a sikum
const updateSikum = async (id, obj) => {
    await Sikum.findByIdAndUpdate(id, obj);
    return "Updated the sikum query";
};

// DELETE - Delete a sikum
const deleteSikum = async (id) => {
    await Sikum.findByIdAndDelete(id);
    return "Deleted the sikum query";
};

module.exports = {
    createSikum,
    getAllSikumim,
    getSikumByID,
    updateSikum,
    deleteSikum
};