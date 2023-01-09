const mongoose = require('mongoose');

// 'Schema' maps to a MongoDB collection and defines the shape of the documents within that collection
// 'Schema' is the blueprint of the documents

const sikumSchema = new mongoose.Schema(
    {
        sikumName: String,
        sikumLink: String
    },
    { versionKey: false }
);


// A 'model' is a class with which we construct documents in a collection
const Sikum = mongoose.model('sikumim', sikumSchema);
// The first argument is the singular name of the collection that will be created for the model (Mongoose will create the database collection for the above model 'person').
// The second argument is the schema to use in creating the model.

module.exports = Sikum;
