const express = require('express');
const sikumBL = require('../YeshivaBL/sikumBL');

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
        const sikumim = await sikumBL.getAllSikumim();
        res.json(sikumim);
    } catch (error) {
        res.json(error);
    }
})

router.route('/:id').get(async (req, res) => {
    try {
        const { id } = req.params;
        const sikum = await sikumBL.getSikumById(id);
        res.json(sikum);
    } catch (error) {
        res.json(error);
    }
});

router.route('/').post(async (req, res) => {
    try {
        const sikumOBJ = req.body;
        const result = await sikumBL.createSikum(sikumOBJ);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
})

router.route('/').put(async (req, res) => {
    try {
        const { id } = req.params;
        const sikumOBJ = req.body;
        const result = await sikumBL.updateSikum(id, sikumOBJ);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
})
router.route('/').delete(async (req, res) => {
    try {
        const { id } = req.params;
        const result = await sikumBL.deleteSikum(id);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;