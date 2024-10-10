const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

const { errorController } = require('@splaika/common');
const protect = require('./middlewares/protect');
const adminProtect = require('./middlewares/adminProtect');

const app = express();

app.use(helmet());

app.use(cors());

app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('combined'));
}

app.disable('x-powered-by'); // Hide Express server information

// Define routes and corresponding microservices
const services = [
	{
		route: '/api/v1/auth',
		target: 'http://localhost:3001/api/v1/auth',
		middlewares: [],
	},
	{
		route: '/api/v1/users',
		target: 'http://localhost:3002/api/v1/users',
		middlewares: [protect],
	},
	{
		route: '/api/v1/admin',
		target: 'http://localhost:3009/api/v1/admin',
		middlewares: [adminProtect],
	},
	// Add more services as needed either deployed or locally.
];

// Define rate limit constants
const rateLimit = 20; // Max requests per minute
const interval = 60 * 1000; // Time window in milliseconds (1 minute)

// Object to store request counts for each IP address
const requestCounts = {};

// Reset request count for each IP address every 'interval' milliseconds
setInterval(() => {
	Object.keys(requestCounts).forEach((ip) => {
		requestCounts[ip] = 0; // Reset request count for each IP address
	});
}, interval);

// Middleware function for rate limiting and timeout handling
function rateLimitAndTimeout(req, res, next) {
	const ip = req.ip; // Get client IP address

	// Update request count for the current IP
	requestCounts[ip] = (requestCounts[ip] || 0) + 1;

	// Check if request count exceeds the rate limit
	if (requestCounts[ip] > rateLimit) {
		// Respond with a 429 Too Many Requests status code
		return res.status(429).json({
			code: 429,
			status: 'Error',
			message: 'Rate limit exceeded.',
			data: null,
		});
	}

	// Set timeout for each request (example: 10 seconds)
	req.setTimeout(15000, () => {
		// Handle timeout error
		res.status(504).json({
			code: 504,
			status: 'Error',
			message: 'Gateway timeout.',
			data: null,
		});
		req.abort(); // Abort the request
	});

	next(); // Continue to the next middleware
}

// Apply the rate limit and timeout middleware to the proxy
app.use(rateLimitAndTimeout);

// Set up proxy middleware for each microservice
services.forEach(({ route, target, middlewares }) => {
	const proxyOptions = {
		target,
		changeOrigin: true,
		pathRewrite: {
			[`^${route}`]: '',
		},
	};

	app.use(
		route,
		rateLimitAndTimeout,
		...(middlewares || []),
		createProxyMiddleware(proxyOptions)
	);
});

app.all('*', (req, res, next) => {
	next(
		new AppError(
			`Can't find ${req.originalUrl} on this api-gateway service server!`,
			404
		)
	);
});

app.use(errorController);

module.exports = app;
