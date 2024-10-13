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
	const accountId = req.body.accountId;

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
	// const userId = req.headers["user-id"];
	const userId = req.body.userId;

	const accounts = await Account.find({ userId });

	res.status(200).json({
		status: 'success',
		results: accounts.length,
		data: {
			accounts,
		},
	});
});

exports.checkAccountOwnership = catchAsync(async (req, res, next) => {
	const { userId, accountId } = req.body;

	console.log(userId);
	console.log(accountId);

	const account = await Account.findById(accountId);

	if (!account || account.userId.toString() !== userId) {
		res.status(200).json({
			status: 'success',
			result: false,
		});
	} else {
		res.status(200).json({
			status: 'success',
			result: true,
		});
	}
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
	const accountNumber = req.body.accountNumber;

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
