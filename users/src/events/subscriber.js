const { connect, StringCodec } = require('nats');
const { createUser } = require('../controllers/controller');

let nc;

const initializeNATSConnection = async () => {
	try {
		nc = await connect({ servers: [process.env.NATS_URL] });
		console.log('Connected to NATS');

		const sc = StringCodec();

		// Subscribe to 'user:created' event
		nc.subscribe('user:created', {
			callback: async (err, msg) => {
				if (err) {
					console.error('Error in subscription:', err);
					return;
				}
				try {
					const userData = JSON.parse(sc.decode(msg.data));
					await createUser(userData);
					console.log('User created in users service:', userData);
				} catch (error) {
					console.error('Error handling user:created event', error);
				}
			},
		});

		console.log('Listening NATS in users');
	} catch (error) {
		return error;
	}
};

module.exports = { initializeNATSConnection };
