const express = require('express');
const userController = require('../controllers/userController');
const accountController = require('../controllers/accountController');

const router = express.Router();

router.route('/').get(userController.getAllUsers);
router.post('/getUserById', userController.getUserById);
router.patch('/updateMe', userController.updateMe);
// router.delete("/deleteAllUsers" , userController.deleteAllUsers);

router.post(
	'/getAccountByAccountNumber',
	accountController.getAccountByAccountNumber
); // in -> esb
router.post('/createAccount', accountController.createAccount); // in -> esb
router.post('/getAccountById', accountController.getAccountById); // in -> esb

router.get('/getAllAccounts', accountController.getAllAccounts);
router.post('/getAccountsByUserId', accountController.getAccountsByUserId); // in -> esb
router.post('/checkAccountOwnership', accountController.checkAccountOwnership);

router.delete('/deleteAccountById', accountController.deleteAccountById); // in -> esb

module.exports = router;
