const express = require('express');
const statementController = require('../controllers/controller');

const router = express.Router();

router.route('/').get(statementController.getAllStatements);

router
	.route('/getStatementById')
	.get(statementController.getStatementsByStatementId);

router.get(
	'/getStatementsByAccountId',
	statementController.getStatementsByAccountId
);

module.exports = router;
