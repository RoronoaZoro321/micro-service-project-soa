const { catchAsync, AppError } = require('@splaika/common');
const Topup = require('../models/topupModel');
const {
	publishAccountUpdated,
	publishStatementCreated,
} = require('../events/publishers/publisher');

exports.topup = catchAsync(async (req, res, next) => {
	const { accountId, code } = req.body;

	const topup = await Topup.findOne({ code });

	if (!topup) {
		return next(new AppError('Invalid code', 400));
	}

	if (topup.isUsed) {
		return next(new AppError('Code already used', 400));
	}

	await publishAccountUpdated({
		type: 'deposit',
		accountId,
		amount: topup.amount,
	});

	topup.isUsed = true;
	await topup.save();

	await publishStatementCreated({
		type: 'topup',
		senderAccountId: null,
		receiverAccountId: accountId,
		amount: topup.amount,
	});

	// If both are successful, return success
	res.status(200).json({
		status: 'success',
		data: {
			message: 'Topup successful',
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
