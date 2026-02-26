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
	'/getAccountByAccountNumber/:accountNumber',
	accountController.getAccountByAccountNumber
);

router.get('/getAccountById/:accountId', accountController.getAccountById);

router.get(
	'/getAccountsByUserId/:userId',
	accountController.getAccountsByUserId
);

router.delete('/deleteAccountById', accountController.deleteAccountById);

module.exports = router;
