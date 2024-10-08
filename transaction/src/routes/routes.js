const express = require('express');
const transactionController = require('../controllers/controller');
const router = express.Router();

router.route('/transactions').get(transactionController.getAllTransactions);
router.route('/transfer').post(transactionController.TransferFunds); // in -> esb
router
	.route('/getAllTransactionsByAccountId')
	.post(transactionController.getAllTransactionsByAccountId); // in -> esb

module.exports = router;
