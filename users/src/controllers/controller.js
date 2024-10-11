const { catchAsync, AppError, User } = require('@splaika/common');

const filterObj = (obj, ...allowedFields) => {
	const newObj = {};
	Object.keys(obj).forEach((el) => {
		if (allowedFields.includes(el)) newObj[el] = obj[el];
	});
	return newObj;
};

exports.createUser = async (userData) => {
	try {
		const newUser = await User.create(userData);

		console.log('User created successfully:', newUser);

		return newUser;
	} catch (err) {
		console.error('Error creating user:', err);
		throw err;
	}
};

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
	console.log(userId);

	// 1) Check if userId is present
	if (!userId) {
		return next(new AppError('UserId is required', 400));
	}

	// 2) Retrieve the user by userId
	const user = await User.find({ citizenId: userId });

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
