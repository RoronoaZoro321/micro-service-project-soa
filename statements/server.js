const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
	console.error('UNCAUGHT EXCEPTION (Statement service)! Shutting down...');
	console.error(err.name, err.message);
	process.exit(1);
});

dotenv.config();

const app = require('./src/app');
const { natsWrapper } = require('@splaika/common');
const {
	initializeNATSSubscriptions,
} = require('./src/events/subscribers/subscriber');

const PORT = process.env.STATEMENT_PORT;
let server; // Declare server variable for later use

const startServer = async () => {
	try {
		// Determine the correct database URL based on the environment
		let DB;
		if (process.env.NODE_ENV === 'development') {
			if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
				throw new Error(
					'Database configuration is missing in environment variables'
				);
			}
			DB = process.env.DATABASE.replace(
				'<PASSWORD>',
				process.env.DATABASE_PASSWORD
			);
		} else if (process.env.NODE_ENV === 'production') {
			if (!process.env.DATABASE_PROD) {
				throw new Error('Production database configuration is missing');
			}
			DB = process.env.DATABASE_PROD;
		} else {
			throw new Error('NODE_ENV is not set to development or production');
		}

		// Attempt to connect to the MongoDB database
		await mongoose.connect(DB);
		console.log('DB connection successful');

		// Initialize NATS connection
		await natsWrapper.connect();

		// Initialize NATS subscriptions
		await initializeNATSSubscriptions();

		// Handle NATS connection close
		natsWrapper._client
			.closed()
			.then(() => {
				console.log('NATS connection closed');
				process.exit(1);
			})
			.catch((err) => {
				console.error('Error closing NATS connection:', err);
				process.exit(1);
			});

		// Graceful shutdown on SIGINT and SIGTERM
		process.on('SIGINT', () => {
			natsWrapper.close();
			server.close(() => process.exit(0));
		});
		process.on('SIGTERM', () => {
			natsWrapper.close();
			server.close(() => process.exit(0));
		});

		// Start the server after successful NATS and DB connections
		server = app.listen(PORT, () => {
			console.log(`Statement Service running on port ${PORT}...`);
		});
	} catch (error) {
		console.error('Failed to start the Statement Service:', error);
		process.exit(1);
	}
};

startServer();

process.on('unhandledRejection', (err) => {
	console.error('UNHANDLED REJECTION (Statement service)! Shutting down...');
	console.error(err.name, err.message);
	if (server) {
		server.close(() => {
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
});
