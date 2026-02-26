const express = require('express');
const statementController = require('../controllers/controller');

const router = express.Router();

router.route('/').get(statementController.getAllStatements);

router
	.route('/getStatementById/:statementId')
	.get(statementController.getStatementsByStatementId);

router.get(
	'/getStatementsByAccountId/:accountId',
	statementController.getStatementsByAccountId
);

module.exports = router;
