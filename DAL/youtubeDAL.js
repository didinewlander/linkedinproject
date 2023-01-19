const axios = require('axios');
//const fs = require('jsonfile');
const file = '../Static/json/data.json';
const getAllVideos = () => {
    console.log("retrived api");
    return axios.get("https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCPVvBjoprUsc008y9zGiBKw&maxResults=100&key=AIzaSyDPfRDUAbOkhJRcVsRABhppv9MSUhkfW0Q");
};
// const getJsonVideos = () => {
//     return fs.readFile(file);
// }
module.exports = { getAllVideos };