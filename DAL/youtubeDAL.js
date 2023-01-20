const axios = require('axios');
require('dotenv').config();

const getAllVideos = () => {
    console.log("retrived api");
    const url = process.env.YOUTUBE_KARNASH_LATEST_TEN;
    return axios.get(url);
};

module.exports = { getAllVideos };