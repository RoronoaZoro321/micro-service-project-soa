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

// Define routes and corresponding microservices
let services = [
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
		route: '/api/v1/accounts',
		target: 'http://localhost:3003/api/v1/accounts',
		middlewares: [protect],
	},
	{
		route: '/api/v1/admin',
		target: 'http://localhost:3009/api/v1/admin',
		middlewares: [adminProtect],
	},
	// Add more services as needed either deployed or locally.
];

if (process.env.NODE_ENV === 'production') {
	services = [
		{
			route: '/api/v1/auth',
			target: process.env.AUTH_SERVICE_URL,
			middlewares: [],
		},
		{
			route: '/api/v1/users',
			target: process.env.USER_SERVICE_URL,
			middlewares: [protect],
		},
		// Add more services as needed either deployed or locally.
	];
}

// Set up proxy middleware for each microservice
services.forEach(({ route, target, middlewares }) => {
	const proxyOptions = {
		target,
		changeOrigin: true,
		pathRewrite: {
			[`^${route}`]: '',
		},
	};

	app.use(route, ...(middlewares || []), createProxyMiddleware(proxyOptions));
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
