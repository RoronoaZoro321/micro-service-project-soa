const soap = require('soap');
const Transaction = require('../models/transactionModel');
const Account = require('../models/accountModel');
const { AppError, errorController } = require('@splaika/common');
const fs = require('fs');
const path = require('path');

const wsdlPath = path.join(__dirname, '/transaction.wsdl');

const soapService = {
	TransactionService: {
		TransactionServicePort: {
			GetAllTransactions: async function (args) {
				console.log('GetAllTransactions');
				try {
					const transactions = await Transaction.find();
					return {
						transactions: transactions.map((t) => ({
							ID: t._id.toString(),
							SenderID: t.senderId.toString(),
							ReceiverID: t.receiverId.toString(),
							Amount: t.amount,
							UpdatedAt: t.updatedAt.toISOString(),
							CreatedAt: t.createdAt.toISOString(),
						})),
					};
				} catch (err) {
					throw new Error(err.message);
				}
			},
			TransferFunds: async function (args) {
				console.log('TransferFunds');
				const { SenderID, ReceiverID, Amount } = args;
				try {
					const amountNum = Number(Amount);

					const senderAccount = await Account.findById(SenderID);
					const receiverAccount = await Account.findById(ReceiverID);

					if (!senderAccount || !receiverAccount) {
						throw new AppError('Account not found', 400);
					}

					if (senderAccount.balance < amountNum) {
						throw new AppError('Insufficient funds', 400);
					}

					senderAccount.balance -= amountNum;
					receiverAccount.balance += amountNum;

					const newTransaction = await Transaction.create({
						senderId: SenderID.toString(),
						receiverId: ReceiverID.toString(),
						amount: amountNum,
					});

					senderAccount.transactionIds.push(newTransaction._id);
					receiverAccount.transactionIds.push(newTransaction._id);

					await senderAccount.save();
					await receiverAccount.save();

					return {
						message: 'Funds transferred successfully',
						transaction: {
							ID: newTransaction._id.toString(),
							SenderID: newTransaction.senderId.toString(),
							ReceiverID: newTransaction.receiverId.toString(),
							Amount: newTransaction.amount,
							UpdatedAt: newTransaction.updatedAt.toISOString(),
							CreatedAt: newTransaction.createdAt.toISOString(),
						},
					};
				} catch (err) {
					throw new Error(err.message);
				}
			},
			GetAllTransactionsByAccountId: async function (args) {
				console.log('GetAllTransactionsByAccountId');
				const { AccountID } = args;
				try {
					const transactions = await Transaction.find({
						$or: [
							{ senderId: AccountID },
							{ receiverId: AccountID },
						],
					});

					return {
						transactions: transactions.map((t) => ({
							ID: t._id.toString(),
							SenderID: t.senderId.toString(),
							ReceiverID: t.receiverId.toString(),
							Amount: t.amount,
							UpdatedAt: t.updatedAt.toISOString(),
							CreatedAt: t.createdAt.toISOString(),
						})),
					};
				} catch (err) {
					throw new Error(err.message);
				}
			},
		},
	},
};

const startSoapServer = (app) => {
	soap.listen(
		app,
		'/api/v1/transaction',
		soapService,
		fs.readFileSync(wsdlPath, 'utf8')
	);
};

module.exports = startSoapServer;
