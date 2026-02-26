const { natsWrapper } = require('@splaika/common');
const AccountUpdatedSubscriber = require('./accountUpdatedSubscriber');

const initializeNATSSubscriptions = async () => {
	try {
		console.log('Initializing NATS JetStream subscriptions');

		// Instantiate subscriber classes
		const accountUpdatedSubscriber = new AccountUpdatedSubscriber();

		// Start listening with JetStream
		await accountUpdatedSubscriber.listen(natsWrapper._client);

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
