const mongoose = require('mongoose');
const validator = require('validator');

const statementSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			enum: ['transfer', 'topup'],
			required: [true, 'Transaction type is required'],
		},
		SenderAccountId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Account',
			validate: {
				validator: function (value) {
					return this.type === 'topup' || value !== null;
				},
				message: 'SenderId is required for transfers',
			},
		},
		ReceiverAccountId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Account',
			required: [true, 'Receiver is required'],
		},
		amount: {
			type: Number,
			required: [true, 'Please provide the amount'],
			validate: {
				validator: function (value) {
					return value > 0;
				},
				message: 'Amount must be a positive number',
			},
		},
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

const Statement = mongoose.model('Statement', statementSchema);

module.exports = Statement;
