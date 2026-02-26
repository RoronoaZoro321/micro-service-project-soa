const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
	{
		senderAccountId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Account',
			required: true,
		},
		receiverAccountId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Account',
			required: true,
		},
		amount: {
			type: Number,
			required: [true, 'Please provide the amount'],
			min: [1, 'Amount cannot be negative or zero'],
		},
		status: {
			type: String,
			enum: ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'],
			required: [true, 'Please provide the status'],
			default: 'COMPLETED',
		},
	},
	{
		timestamps: true,
	}
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
