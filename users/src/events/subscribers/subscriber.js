const { natsWrapper } = require('@splaika/common');
const UserSignupSubscriber = require('./userSignupSubscriber');

const initializeNATSSubscriptions = async () => {
	try {
		console.log('Initializing NATS JetStream subscriptions');

		// Instantiate subscriber classes
		const userSignupSubscriber = new UserSignupSubscriber();

		// Start listening with JetStream
		await userSignupSubscriber.listen(natsWrapper._client);

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
