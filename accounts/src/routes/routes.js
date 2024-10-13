const express = require('express');
const accountController = require('../controllers/controller');

const router = express.Router();

router
	.route('/')
	.get(accountController.getAllAccounts)
	.post(accountController.createAccount)
	.put(accountController.updateAccountById);

router
	.route('/me')
	.get(accountController.getMyAccounts)
	.put(accountController.updateMyAccount);

router.get(
	'/getAccountByAccountNumber',
	accountController.getAccountByAccountNumber
);

router.get('/getAccountById', accountController.getAccountById);

router.get('/getAccountsByUserId', accountController.getAccountsByUserId);

router.post('/checkAccountOwnership', accountController.checkAccountOwnership);

router.delete('/deleteAccountById', accountController.deleteAccountById);

module.exports = router;
