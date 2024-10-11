const { connect, StringCodec } = require('nats');

let nc;

const initializeNATSConnection = async () => {
	try {
		nc = await connect({ servers: [process.env.NATS_URL] });
		console.log('Connected to NATS');
	} catch (error) {
		return error;
	}
};

const publishUserCreated = (userData) => {
	try {
		if (!nc) {
			throw new Error('NATS connection is not initialized');
		}
		const sc = StringCodec();

		nc.publish('user:created', sc.encode(JSON.stringify(userData)));

		console.log('Event published to user:created');
	} catch (error) {
		console.error('Error publishing event:', error);
	}
};

module.exports = { initializeNATSConnection, publishUserCreated };
