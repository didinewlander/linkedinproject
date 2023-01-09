const express = require('express');
const classBL = require('../YeshivaBL/classBL');

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
        const Classes = await classBL.getAllClasses();
        res.json(Classes);
    } catch (error) {
        res.json(error);
    }
})

router.route('/:id').get(async (req, res) => {
    try {
        const { id } = req.params;
        const Class = await classBL.getClassById(id);
        res.json(Class);
    } catch (error) {
        res.json(error);
    }
});

router.route('/').post(async (req, res) => {
    try {
        const classOBJ = req.body;
        const result = await classBL.createClass(classOBJ);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
})

router.route('/').put(async (req, res) => {
    try {
        const { id } = req.params;
        const classOBJ = req.body;
        const result = await classBL.updateClass(id, classOBJ);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
})
router.route('/').delete(async (req, res) => {
    try {
        const { id } = req.params;
        const result = await classBL.deleteClass(id);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;