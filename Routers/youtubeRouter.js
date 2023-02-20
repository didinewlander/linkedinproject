const express = require('express');
const youtubeBL = require('../BL/youtubeBL');

const router = express.Router();

router.route('/').get(async (req, res) => {
    console.log(`\x1b[34m|------ Called Youtube Latest 10 Videos ------|\x1b[0m\n`);
    const videos = await youtubeBL.getLatestTenVideos(); 
    res.json(videos);
});


module.exports = router;