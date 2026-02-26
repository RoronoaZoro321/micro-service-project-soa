const express = require('express');
const userController = require('../controllers/controller');

const router = express.Router();

router.route('/').get(userController.getAllUsers);

router.get('/getUserById', userController.getUserById);

router.get('/getUserByCitizenId', userController.getUserByCitizenId);

router.put('/updateMe', userController.updateMe);

router.get('/me', userController.getMe);

// router.delete("/deleteAllUsers" , userController.deleteAllUsers);

module.exports = router;
