const axios = require('axios');
require('dotenv').config();

const getAllVideos = () => {
    console.log("retrived general api");
    const url = process.env.YOUTUBE_KARNASH_LATEST_TEN;
    return axios.get(url);
};

const getLatestPlaylists = () => {
    console.log("retrived playlist api");
    const url = process.env.YOUTUBE_KARNASH_LATEST_PLAYLIST;
    return axios.get(url);
};

module.exports = { getAllVideos, getLatestPlaylists};