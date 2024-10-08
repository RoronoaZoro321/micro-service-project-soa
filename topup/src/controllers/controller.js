const { catchAsync, AppError, Account, Topup } = require('@splaika/common');

exports.topup = catchAsync(async (req, res, next) => {
	const { accountId, code } = req.body;
	console.log('code', code);
	const account = await Account.findById(accountId);

	if (!account) {
		return next(new AppError('Account not found', 400));
	}

	const topup = await Topup.findOne({ code });

	if (!topup) {
		return next(new AppError('Invalid code', 400));
	}

	if (topup.isUsed) {
		return next(new AppError('Code already used', 400));
	}

	account.balance += topup.amount;
	topup.isUsed = true;
	await account.save();
	await topup.save();

	res.status(200).json({
		status: 'success',
		data: {
			message: 'Topup successful',
			account,
		},
	});
});

exports.createTopup = catchAsync(async (req, res, next) => {
	const { code, amount } = req.body;
	const topup = await Topup.create({
		code,
		amount,
	});

	res.status(201).json({
		status: 'success',
		data: {
			topup,
		},
	});
});

exports.getAllTopup = catchAsync(async (req, res, next) => {
	const topups = await Topup.find();

	res.status(200).json({
		status: 'success',
		results: topups.length,
		data: {
			topups,
		},
	});
});
