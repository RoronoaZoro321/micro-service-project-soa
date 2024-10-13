const { catchAsync, AppError } = require('@splaika/common');
const User = require('../models/userModel');

const filterObj = (obj, ...allowedFields) => {
	const newObj = {};
	Object.keys(obj).forEach((el) => {
		if (allowedFields.includes(el)) newObj[el] = obj[el];
	});
	return newObj;
};

exports.createUser = catchAsync(async (userData) => {
	const newUser = await User.create(userData);
	return newUser;
});

exports.updateUserAccounts = catchAsync(async (userId, accountId) => {
	const user = await User.findById(userId);

	// Throw an error if the user is not found
	if (!user) {
		throw new AppError('User not found', 404);
	}

	// Add the account ID to the user's accounts array
	user.accounts.push(accountId);
	await user.save();

	// Return the updated user for further actions if needed
	return user;
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		status: 'success',
		results: users.length,
		data: {
			users,
		},
	});
});

exports.getUserById = catchAsync(async (req, res, next) => {
	const { userId } = req.body;

	const user = await User.findById(userId);

	if (!user) {
		return next(new AppError('User not found', 400));
	}

	res.status(200).json({
		status: 'success',
		data: {
			user,
		},
	});
});

exports.getUserByCitizenId = catchAsync(async (req, res, next) => {
	const { citizenId } = req.body;

	const user = await User.find({ citizenId: citizenId });

	if (!user) {
		return next(new AppError('User not found', 400));
	}

	res.status(200).json({
		status: 'success',
		data: {
			user,
		},
	});
});

exports.updateMe = catchAsync(async (req, res, next) => {
	// 1) Create error if user POSTs pin data
	if (req.body.pin) {
		return next(
			new AppError(
				'This route is not for pin updates. Please use /updateMyPin',
				400
			)
		);
	}

	const userId = req.headers['user-id'];

	// 2) Filtered out unwanted fields names that are not allowed to be updated
	const filteredBody = filterObj(req.body, 'citizenId', 'email');

	// 3) Update user document
	const updatedUser = await User.findByIdAndUpdate(userId, filteredBody, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: {
			user: updatedUser,
		},
	});
});

exports.deleteAllUsers = catchAsync(async (req, res, next) => {
	await User.deleteMany();

	res.status(204).json({
		status: 'success',
		data: 'success',
	});
});

exports.getMe = catchAsync(async (req, res, next) => {
	const userId = req.headers['user-id'];

	// 1) Check if userId is present
	if (!userId) {
		return next(new AppError('UserId is required', 400));
	}

	// 2) Retrieve the user by userId
	const user = await User.findById(userId);

	// 3) Handle case where user is not found
	if (!user) {
		return next(new AppError('User not found', 404));
	}

	// 4) Send back the user data
	res.status(200).json({
		status: 'success',
		data: {
			user,
		},
	});
});
