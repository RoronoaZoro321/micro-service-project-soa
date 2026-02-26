const { natsWrapper } = require('@splaika/common');
const StatementCreatedSubscriber = require('./statementCreatedSubscriber');

const initializeNATSSubscriptions = async () => {
	try {
		console.log('Initializing NATS JetStream subscriptions');

		// Instantiate subscriber classes
		const statementCreatedSubscriber = new StatementCreatedSubscriber();

		// Start listening with JetStream
		await statementCreatedSubscriber.listen(natsWrapper._client);

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
