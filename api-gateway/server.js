const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION (API-GATEWAY)! Shutting down...');
	console.log(err.name, err.message);
	process.exit(1);
});

dotenv.config();

const app = require('./src/app');

// Define port for Express server
const PORT = process.env.API_GATEWAY_PORT;

// Start Express server
app.listen(PORT, () => {
	console.log(`API-GATEWAY running on port ${PORT}...`);
});

process.on('unhandledRejection', (err) => {
	console.log('UNHANDLER REJECTION (API-GATEWAY)! Shutting down...');
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
