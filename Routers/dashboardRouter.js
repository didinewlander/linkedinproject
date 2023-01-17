const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/Dashboard(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '.','html', 'Dashboard.html'));
});

module.exports = router;