const express = require('express');
const accountController = require('../controllers/controller');

const router = express.Router();

router
	.route('/')
	.get(accountController.getAllAccounts)
	.post(accountController.createAccount);

router.get('/me', accountController.getMyAccounts);

router.get(
	'/getAccountByAccountNumber',
	accountController.getAccountByAccountNumber
);

router.get('/getAccountById', accountController.getAccountById);

router.get('/getAccountsByUserId', accountController.getAccountsByUserId);

router.post('/checkAccountOwnership', accountController.checkAccountOwnership);

router.delete('/deleteAccountById', accountController.deleteAccountById);

module.exports = router;
