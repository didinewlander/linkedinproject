const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const videos_connection = (uri) => {
    mongoose.connect(uri)
        .catch((error) => console.log(error));
}

const dbConnection = mongoose.connection;

dbConnection.once("open", () => {
    console.log('Connection established with video server DB');
    require('../BL/videoListUpdaterBL').timedUpdate()
})


module.exports = videos_connection;