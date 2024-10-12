const natsWrapper = require('../natsWrapper');
const UserCreatedSubscriber = require('./userCreatedSubscriber');

const initializeNATSSubscriptions = async () => {
	try {
		console.log('Initializing NATS JetStream subscriptions');

		// Instantiate subscriber classes
		const userCreatedSubscriber = new UserCreatedSubscriber();

		// Start listening with JetStream
		await userCreatedSubscriber.listen(natsWrapper._client);

		console.log('NATS JetStream subscriptions initialized');
	} catch (error) {
		console.error(
			'Error initializing NATS JetStream subscriptions:',
			error
		);
		throw error;
	}
};

module.exports = { initializeNATSSubscriptions };
