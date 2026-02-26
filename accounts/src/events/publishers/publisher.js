const { natsWrapper } = require('@splaika/common');

const publishAccountCreated = async (data) => {
	try {
		await natsWrapper.publish('account:created', data);
		console.log('Event published to account:created');
	} catch (error) {
		console.error('Error publishing event:', error);
	}
};

module.exports = {
	publishAccountCreated,
};
