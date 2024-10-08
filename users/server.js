const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION (User service)! Shutting down...');
	console.log(err.name, err.message);
	process.exit(1);
});

dotenv.config();

const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);

mongoose
	.connect(DB)
	.then(() => console.log('DB connection successful'))
	.catch((err) => console.error('DB connection error:', err));

const app = require('./src/app');

const PORT = process.env.USER_PORT;

app.listen(PORT, () => {
	console.log(`User Service running on port ${PORT}...`);
});

process.on('unhandledRejection', (err) => {
	console.log('UNHANDLER REJECTION (User service)! Shutting down...');
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
