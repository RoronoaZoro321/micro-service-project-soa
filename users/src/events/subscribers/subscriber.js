const natsWrapper = require('../natsWrapper');
const UserCreatedSubscriber = require('./userCreatedSubscriber');

const initializeNATSSubscriptions = async () => {
	try {
		console.log('Initializing NATS subscriptions');

		const stringCodec = natsWrapper._stringCodec;

		// Instantiate subscriber classes
		const userCreatedSubscriber = new UserCreatedSubscriber();
		// const userUpdatedSubscriber = new UserUpdatedSubscriber();

		// Start listening
		await userCreatedSubscriber.listen(natsWrapper._client, stringCodec);
		// await userUpdatedSubscriber.listen(natsWrapper._client, stringCodec);

		console.log('NATS subscriptions initialized');
	} catch (error) {
		console.error('Error initializing NATS subscriptions:', error);
		throw error;
	}
};

module.exports = { initializeNATSSubscriptions };
