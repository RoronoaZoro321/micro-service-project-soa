const { catchAsync, AppError } = require('@splaika/common');
const Account = require('../models/accountModel');
const { publishAccountCreated } = require('../events/publishers/publisher');

async function generateUniqueAccountNumber() {
	let accountNumber;
	let account;

	// Generate a unique account number
	do {
		accountNumber = Math.floor(1000000000 + Math.random() * 9000000000); // Generates a 10-digit number
		account = await Account.findOne({ accountNumber });
	} while (account);

	return accountNumber;
}

exports.createAccount = catchAsync(async (req, res, next) => {
	const userId = req.headers['user-id'];

	const newAccount = await Account.create({
		accountNumber: await generateUniqueAccountNumber(),
		userId,
	});

	publishAccountCreated({
		accountId: newAccount._id,
		userId,
	});

	res.status(201).json({
		status: 'success',
		data: {
			account: newAccount,
		},
	});
});

exports.updateAccount = catchAsync(async (data) => {
	const { accountId, amount, type } = data;

	// Find the account by ID
	const account = await Account.findById(accountId);

	// Check if the account exists
	if (!account) {
		throw new AppError('Account not found', 404);
	}

	switch (type) {
		case 'deposit':
			account.balance += amount;

			// await publishBalanceUpdated({
			// 	transactionId: transaction._id,
			// 	status: 'success',
			// 	accountId: transaction.recieverAccountId,
			// 	amount: transaction.amount,
			// });

			break;
		case 'transfer':
			account.balance -= amount;

			if (account.balance < 0) {
				throw new AppError('Insufficient funds', 400);
			}

			// await publishBalanceUpdated({
			// 	transactionId: transaction._id,
			// 	status: 'success',
			// 	accountId: transaction.senderAccountId,
			// 	amount: transaction.amount,
			// });

			break;
		default:
			throw new AppError('Invalid transaction type', 400);
	}

	await account.save();

	return account;
});

exports.getAllAccounts = catchAsync(async (req, res, next) => {
	const accounts = await Account.find();

	res.status(200).json({
		status: 'success',
		results: accounts.length,
		data: {
			accounts,
		},
	});
});

exports.getAccountById = catchAsync(async (req, res, next) => {
	const accountId = req.params.accountId;

	const account = await Account.findById(accountId);

	if (!account) {
		return next(new AppError('Account not found', 400));
	}

	res.status(200).json({
		status: 'success',
		data: {
			account,
		},
	});
});

exports.getAccountsByUserId = catchAsync(async (req, res, next) => {
	const userId = req.params.userId;

	const accounts = await Account.find({ userId });

	res.status(200).json({
		status: 'success',
		results: accounts.length,
		data: {
			accounts,
		},
	});
});

exports.deleteAccountById = catchAsync(async (req, res, next) => {
	const accountId = req.body.accountId;

	const account = await Account.findByIdAndDelete(accountId);
	// await userController.removeAccount(account.userId, accountId);

	if (!account) {
		return next(new AppError('Account not found', 400));
	}

	// remove account from user

	res.status(204).json({
		status: 'success',
		data: 'success delete account',
	});
});

exports.getAccountByAccountNumber = catchAsync(async (req, res, next) => {
	const accountNumber = req.params.accountNumber;

	const account = await Account.findOne({ accountNumber });

	if (!account) {
		return next(new AppError('Account not found', 400));
	}

	res.status(200).json({
		status: 'success',
		data: {
			account,
		},
	});
});

exports.getMyAccounts = catchAsync(async (req, res, next) => {
	const userId = req.headers['user-id'];

	const accounts = await Account.find({ userId });

	res.status(200).json({
		status: 'success',
		results: accounts.length,
		data: {
			accounts,
		},
	});
});

exports.updateMyAccount = catchAsync(async (req, res, next) => {
	const userId = req.headers['user-id'];
	const accountId = req.body.accountId;
	const updateData = { ...req.body };

	// Remove fields that should not be updated
	delete updateData.accountId;
	delete updateData.accountNumber;
	delete updateData.userId;

	// Find the account by ID and user ID to ensure ownership
	const account = await Account.findOneAndUpdate(
		{ _id: accountId, userId },
		updateData,
		{ new: true, runValidators: true }
	);

	if (!account) {
		return next(
			new AppError('Account not found or not owned by user', 404)
		);
	}

	res.status(200).json({
		status: 'success',
		data: {
			account,
		},
	});
});

exports.updateAccountById = catchAsync(async (req, res, next) => {
	const accountId = req.body.accountId;
	const updateData = { ...req.body };

	// Remove fields that should not be updated
	delete updateData.accountId;
	delete updateData.accountNumber;
	delete updateData.userId;

	// Find the account by ID and update
	const account = await Account.findByIdAndUpdate(accountId, updateData, {
		new: true,
		runValidators: true,
	});

	if (!account) {
		return next(new AppError('Account not found', 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			account,
		},
	});
});
