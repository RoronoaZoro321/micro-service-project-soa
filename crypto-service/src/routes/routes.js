const express = require('express');
const cryptoController = require('../controllers/controller')

const router = express.Router();

router.route('/getAddressAndABI').get(cryptoController.getContractAbiAndAddress)

router.route('/deposit').post(cryptoController.deposit);
router.route('/transfer').post(cryptoController.transfer);
// router.route('/').get(cryptoController.getAccounts);

// router.route('/getBalance').get(cryptoController.getBalance)
// router.route('/').get(userController.getAllUsers);

// router.get('/getUserById', userController.getUserById);

// router.patch('/updateMe', userController.updateMe);

// router.get('/me', userController.getMe);

// router.delete("/deleteAllUsers" , userController.deleteAllUsers);

module.exports = router;
