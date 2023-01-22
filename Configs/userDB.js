const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const users_connection = (uri) => {
    console.log('1');
    mongoose.connect(uri)
        .then(() => console.log('connected to user DB'))
        .catch((error) => console.log(error));
}

const connection = mongoose.connection;
connection.once("open", () => console.log('connection established'))

module.exports = users_connection;