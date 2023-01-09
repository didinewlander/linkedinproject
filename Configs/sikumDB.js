const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const classDBConnection = (uri)=>{
    mongoose.connect(uri)
    .then(()=>console.log('connected to sikum DB'))
    .catch((error)=>console.log(error));
}

const connection = mongoose.connection;
connection.once("open", ()=>console.log('connection established'))

module.exports = classDBConnection;