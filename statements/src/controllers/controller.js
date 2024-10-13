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

exports.addStatement = catchAsync(async (data) => {
	const { type, senderAccountId, receiverAccountId, amount } = data;

	const newStatement = await Statement.create({
		type,
		SenderAccountId: senderAccountId,
		ReceiverAccountId: receiverAccountId,
		amount,
	});

	return newStatement;
});
