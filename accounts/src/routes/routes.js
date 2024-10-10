const express = require('express');
const accountController = require('../controllers/accountController');

const router = express.Router();

router
	.route('/')
	.get(accountController.getAllAccounts)
	.post(accountController.createAccount);

router.post(
	'/getAccountByAccountNumber',
	accountController.getAccountByAccountNumber
);
router.post('/getAccountById', accountController.getAccountById);
router.post('/getAccountsByUserId', accountController.getAccountsByUserId);
router.post('/checkAccountOwnership', accountController.checkAccountOwnership);

router.delete('/deleteAccountById', accountController.deleteAccountById);

module.exports = router;
