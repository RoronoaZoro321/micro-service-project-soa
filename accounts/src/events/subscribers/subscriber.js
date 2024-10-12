const { natsWrapper } = require('@splaika/common');
const UserCreateSubscriber = require('./userCreatedSubscriber');

const initializeNATSSubscriptions = async () => {
	try {
		console.log('Initializing NATS JetStream subscriptions');

		// Instantiate subscriber classes
		const userCreateSubscriber = new UserCreateSubscriber();

		// Start listening with JetStream
		await userCreateSubscriber.listen(natsWrapper._client);

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
