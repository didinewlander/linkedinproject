const express = require('express');
const userBL = require('../YeshivaBL/userBL');

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
        const users = await userBL.getAllUsers();
        res.json(users);
    } catch (error) {
        res.json(error);
    }
})

router.route('/:id').get(async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userBL.getUserById(id);
        res.json(user);
    } catch (error) {
        res.json(error);
    }
});

router.route('/').post(async (req, res) => {
    try {
        const userOBJ = req.body;
        const result = await userBL.createUser(userOBJ);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
})

router.route('/').put(async (req, res) => {
    try {
        const { id } = req.params;
        const userOBJ = req.body;
        const result = await userBL.updateUser(id, userOBJ);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
})
router.route('/').delete(async (req, res) => {
    try {
        const { id } = req.params;
        const result = await userBL.deleteUser(id);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;