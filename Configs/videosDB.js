const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const videos_connection = (uri) => {
    mongoose.connect(uri)
        .catch((error) => { if (error.name === 'MongooseServerSelectionError') { console.log(`\x1b[31mError Connecting To Video Database\x1b[0m`)} });
}

const dbConnection = mongoose.connection;

dbConnection.once("open", () => {
    console.log(`\x1b[35mConnection established with video server DB\n- - * * * - -\n\x1b[0m`);
   // require('../BL/videoListUpdaterBL').timedUpdate()
   // require('../BL/videoListUpdaterBL').fullVideoListPullData();
})


module.exports = videos_connection;