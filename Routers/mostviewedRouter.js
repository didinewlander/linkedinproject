const express = require('express');
const youtubeBL = require('../BL/youtubeBL');

const router = express.Router();

router.route('/').get(async (req, res) => {
    console.log("arrived at liked");
    const mostViewedVideos = await youtubeBL.getMostViewedVideos();
    res.json(mostViewedVideos);
});

module.exports = router;