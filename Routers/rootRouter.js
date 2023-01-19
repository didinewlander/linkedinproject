const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    console.log("connected to root");
    res.sendFile(path.join(__dirname, '..', 'App', 'index.html'));
});

module.exports = router;