const express = require('express');
const youtubeBL = require('../BL/youtubeBL');

const router = express.Router();

router.route('/').get(async (req, res) => {
    console.log("arrived at playlists");
    const playlists = await youtubeBL.getLatestPlaylists();
    res.json(playlists);
});


module.exports = router;