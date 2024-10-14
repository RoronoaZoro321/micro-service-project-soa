const { catchAsync, AppError } = require('@splaika/common');
const Transaction = require('../models/transactionModel');
const {
	publishAccountUpdated,
	publishStatementCreated,
} = require('../events/publishers/publisher');

exports.transfer = catchAsync(async (req, res, next) => {
	const { senderId, receiverId, amount } = req.body;

	const transaction = await Transaction.create({
		senderAccountId: senderId,
		receiverAccountId: receiverId,
		amount,
		// status: 'PENDING',
	});

	await publishAccountUpdated({
		transactionId: transaction._id,
		type: 'transfer',
		accountId: transaction.senderAccountId,
		amount: transaction.amount,
	});

	await publishAccountUpdated({
		transactionId: transaction._id,
		type: 'deposit',
		accountId: transaction.receiverAccountId,
		amount: transaction.amount,
	});

	await publishStatementCreated({
		type: 'transfer',
		senderAccountId: transaction.senderAccountId,
		receiverAccountId: transaction.receiverAccountId,
		amount: transaction.amount,
	});

	res.status(201).json({
		status: 'success',
		transaction,
	});
});
