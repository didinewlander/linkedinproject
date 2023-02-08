const express = require('express');
const rabanimImagesDAL = require('../DAL/imagesJsonDAL');

const router = express.Router();

router.route('/').get(async (req, res) => {
    const rabanim = await rabanimImagesDAL.getRabanimImages();
    res.json(rabanim);
});

module.exports = router;