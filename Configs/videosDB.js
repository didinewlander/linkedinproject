const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const videos_connection = (uri) => {
    mongoose.connect(uri)
        .catch((error) => console.log(error));
}

const dbConnection = mongoose.connection;

dbConnection.once("open", () => {
    console.log(`\x1b[35mConnection established with video server DB\n- - * * * - -\n\n\x1b[0m`);
    require('../BL/videoListUpdaterBL').timedUpdate()
})


module.exports = videos_connection;