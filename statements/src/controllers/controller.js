const { catchAsync, AppError } = require('@splaika/common');
const Statement = require('../models/statementModel');

exports.getAllStatements = catchAsync(async (req, res) => {
	const statements = await Statement.find();

	res.status(200).json({
		status: 'success',
		results: statements.length,
		data: {
			statements,
		},
	});
});

exports.getStatementsByStatementId = catchAsync(async (req, res) => {
	const statementId = req.params.statementId;

	const statement = await Statement.findById(statementId);

	res.status(200).json({
		status: 'success',
		data: {
			statement,
		},
	});
});

exports.getStatementsByAccountId = catchAsync(async (req, res) => {
	const accountId = req.params.accountId;

	const statements = await Statement.find({
		$or: [{ senderAccountId: accountId }, { receiverAccountId: accountId }],
	});

	res.status(200).json({
		status: 'success',
		results: statements.length,
		data: {
			statements,
		},
	});
});

exports.addStatement = catchAsync(async (data) => {
	const { type, senderAccountId, receiverAccountId, amount } = data;

	const newStatement = await Statement.create({
		type,
		senderAccountId,
		receiverAccountId,
		amount,
	});

	return newStatement;
});
