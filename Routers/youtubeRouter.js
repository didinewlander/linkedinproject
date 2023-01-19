const express = require('express');
const youtubeBL = require('../YeshivaBL/youtubeBL');

const router = express.Router();

router.route('/').get(async (req, res) => {
    //res.sendFile(path.join(__dirname, 'Static/json', 'data.json'));
    console.log("arrived at route");
    const videos = await youtubeBL.getAllVideos();
    res.json(videos);
});

module.exports = router;