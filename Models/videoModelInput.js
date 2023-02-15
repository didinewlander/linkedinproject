const mongoose = require('mongoose');

// 'Schema' maps to a MongoDB collection and defines the shape of the documents within that collection
// 'Schema' is the blueprint of the documents

const videoSchema = new mongoose.Schema(
    {
        videoId: String,
        kind: String,
        publishedAt: String,
        title: String,
        description: String,
        thumbnail: Object,
        speaker: Array,
        playlistId: Array,
        tags: Array,
        speakerImage: String
    },
    { versionKey: false }
);


// A 'model' is a user with which we construct documents in a collection
const videoInput = mongoose.model('YVDS', videoSchema);
// The first argument is the singular name of the collection that will be created for the model (Mongoose will create the database collection for the above model 'person').
// The second argument is the schema to use in creating the model.

module.exports = videoInput;
