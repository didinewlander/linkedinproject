const express = require('express');
const youtubeBL = require('../BL/youtubeBL');

const router = express.Router();

router.route('/').get(async (req, res) => {
    console.log("arrived at route");
    const videos = await youtubeBL.getLatestTenVideos();
    console.log("completed processing videos");
    res.json(videos);
});


module.exports = router;