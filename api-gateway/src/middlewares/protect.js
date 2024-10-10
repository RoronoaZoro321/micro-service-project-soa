const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { AppError, catchAsync } = require('@splaika/common');

const protect = catchAsync(async (req, res, next) => {
	let token;

	if (req.cookies && req.cookies.sessionId) {
		token = req.cookies.sessionId;
	}

	if (!token) {
		return next(
			new AppError(
				'You are not logged in! Please log in to get access.',
				401
			)
		);
	}

	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	req.currentUser = {
		id: decoded.id,
	};

	req.headers['user-id'] = decoded.id;

	next();
});

module.exports = protect;
