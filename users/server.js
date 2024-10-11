const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION (User service)! Shutting down...');
	console.log(err.name, err.message);
	process.exit(1);
});

dotenv.config();

const app = require('./src/app');
const { initializeNATSConnection } = require('./src/events/subscriber');

const PORT = process.env.USER_PORT;
let server; // Declare server variable for later use

const startServer = async () => {
	try {
		// Determine the correct database URL based on the environment
		let DB;
		if (process.env.NODE_ENV === 'development') {
			DB = process.env.DATABASE.replace(
				'<PASSWORD>',
				process.env.DATABASE_PASSWORD
			);
		} else if (process.env.NODE_ENV === 'production') {
			DB = process.env.DATABASE_PROD;
		}

		// Attempt to connect to the MongoDB database
		await mongoose.connect(DB);
		console.log('DB connection successful');

		// Initialize NATS connection
		await initializeNATSConnection();
		console.log('NATS connection initialized');

		// Start the server after successful NATS and DB connections
		server = app.listen(PORT, () => {
			console.log(`User Service running on port ${PORT}...`);
		});
	} catch (error) {
		console.error('Failed to start the User Service:', error);
		process.exit(1);
	}
};

startServer();

process.on('unhandledRejection', (err) => {
	console.log('UNHANDLED REJECTION (User service)! Shutting down...');
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
