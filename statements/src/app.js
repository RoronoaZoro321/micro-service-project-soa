const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');

const { AppError, errorController } = require('@splaika/common');
const statementRouter = require('./routes/routes');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Use the CORS middleware
app.use(cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '100kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Serving static file
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

// 3) ROUTES
app.use('/api/v1/statements', statementRouter);

app.all('*', (req, res, next) => {
	next(
		new AppError(
			`Can't find ${req.originalUrl} on this user service server!`,
			404
		)
	);
});

app.use(errorController);

module.exports = app;
