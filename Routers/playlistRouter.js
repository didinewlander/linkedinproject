const express = require('express');
const youtubeBL = require('../YeshivaBL/youtubeBL');

const router = express.Router();

router.route('/').get(async (req, res) => {
    console.log("arrived at playlists");
    const playlists = await youtubeBL.getLatestPlaylists();
    console.log("playlists are complete");
    res.json(playlists);
});

module.exports = router;