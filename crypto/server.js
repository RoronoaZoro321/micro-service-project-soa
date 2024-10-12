
// const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION (User service)! Shutting down...');
	console.log(err.name, err.message);
	process.exit(1);
});

dotenv.config();

// let DB;

// if (process.env.NODE_ENV === 'development') {
	// 	DB = process.env.DATABASE.replace(
		// 		'<PASSWORD>',
		// 		process.env.DATABASE_PASSWORD
		// 	);
		// }
		
		// if (process.env.NODE_ENV === 'production') {
			// 	DB = process.env.DATABASE_PROD;
			// }
			
			// mongoose
			// 	.connect(DB)
			// 	.then(() => console.log('DB connection successful'))
			// 	.catch((err) => console.error('DB connection error:', err));
			
			// const { initializeNATSConnection } = require('./src/events/subscriber');
			
console.log("hello");
const PORT = process.env.CRYPTO_PORT;
console.log(PORT);
const app = require('./src/app');
console.log("hello2");


const startServer = async () => {
	try {
		// await initializeNATSConnection();
		// console.log('NATS connection initialized');

		// Start the server after successful NATS connection
		app.listen(PORT, () => {
			console.log(`Crypto Service running on port ${PORT}...`);
		});
	} catch (error) {
		console.error('Failed to start the Crypto Service:', error);
		process.exit(1);
	}
};

startServer();

process.on('unhandledRejection', (err) => {
	console.log('UNHANDLER REJECTION (User service)! Shutting down...');
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
