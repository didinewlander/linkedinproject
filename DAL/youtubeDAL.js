const axios = require('axios');

const getAllVideos = () => {
    return axios.get("https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCPVvBjoprUsc008y9zGiBKw&maxResults=100&key=AIzaSyDPfRDUAbOkhJRcVsRABhppv9MSUhkfW0Q");
};

module.exports = getAllVideos;