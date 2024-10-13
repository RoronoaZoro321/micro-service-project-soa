const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

const { AppError, errorController } = require('@splaika/common');
const protect = require('./middlewares/protect');
const adminProtect = require('./middlewares/adminProtect');

const app = express();

app.use(helmet());

app.use(cors());

app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('combined'));
}

app.disable('x-powered-by');

// Define routes and corresponding microservices
const services = [
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
	{
		route: '/api/v1/accounts',
		target: process.env.ACCOUNT_SERVICE_URL,
		middlewares: [protect],
	},
	{
		route: '/api/v1/topup',
		target: process.env.TOPUP_SERVICE_URL,
		middlewares: [],
	},
];

// Set up proxy middleware for each microservice
services.forEach(({ route, target, middlewares }) => {
	const proxyOptions = {
		target,
		changeOrigin: true,
		pathRewrite: {
			[`^${route}`]: '',
		},
		onProxyReq: (proxyReq, req) => {
			if (req.currentUser) {
				proxyReq.setHeader('user-id', req.currentUser.id);
			}
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
